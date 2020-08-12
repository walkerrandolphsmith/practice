# Sidecars

The open-closed principle is a software design pattern that comes from object-oriented programming. The pattern encourages extending existing software without modifying the original code; Open to extension closed to modification. Kubernetes establishes a pattern for system design called the ambassador pattern which allows the deployment of a "sidecar" container to extend the functionality of the container on the same pod. Since the containers in the pod share the same host, DNS, and volume mount there are several applications of sidecars. We will use this pattern to extend the functionality of a "legacy" application without modifying the code or building a new image. The legacy application will accept HTTP requests and log to a file on disk. We want to aggregate logs across containers and pods and consistently format them for a centralized logging interface. Logs are essential to the operational health of our system and debugging.

## Experiment

We'll create a deployment and service for the legacy app

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: legacy
  labels:
    name: legacy
spec:
  selector:
    matchLabels:
      name: legacy
  template:
    metadata:
      labels:
        name: legacy
    spec:
      containers:
        - name: legacy
          image: walkerrandolphsmith/legacy-logging:2.0
          ports:
            - containerPort: 3000
          env:
            - name: LOG_PATH
              value: /var/log/legacy-logging
            - name: LOG_FILE
              value: request.log
          volumeMounts:
            - name: logging-vol
              mountPath: /var/log/legacy-logging
      volumes:
        - name: logging-vol
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: legacy
  labels:
    name: legacy
spec:
  type: NodePort
  ports:
    - port: 3000
  selector:
    name: legacy
```

If we attempt to read the pod logs we won't see any logging from our container. Pod logs will include logs written by containers on stdout. We can exec a shell on the pod and `cat` the mounted logfile and see our container's log messages. Our centralized logging system needs the log messages in a certain format and can't read them from this mounted file. This solution won't scale when we have hundreds of containers writing log files in different directories across many pods.

Now we'll introduce our sidecar. fluentd is a log message aggregator that we can use to share the mounted volume used by our application. fluentd can `tail` the log file and generate stdout messages for each line in the log file. The sidecar extended our logging capability and our legacy app will continue to write log messages to disk as it has always done. Open to extension, closed to modification. fluentd will need a configuration file at `/fluentd/etc` and we will use a Kubernetes ConfigMap object to create the fluentd config.

```
containers:
    - name: fdlogger
      env:
      - name: FLUENT_UID
          value: root
      image: fluent/fluentd:v1.3-debian-1
      volumeMounts:
      - name: logging-vol
          mountPath: /var/log/legacy-logging
      - name: log-config
          mountPath: /fluentd/etc/

volumes:
- name: log-config
    configMap:
    name: fluentd-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/legacy-logging/request.log
      tag legacy.logger
      format none
    </source>
    <match legacy.logger>
      @type stdout
    </match>
```

To see our sidecar in action perform the following:

```
# apply the deployment, service, and configmag
kubectl apply -f legacy.yml
# expose the service
minikube service legacy --url
# In a new terminal, start the dashboard
minikube dashboard
# In a new terminal, make HTTP requests to our service
curl http:<ip-address>/
curl http:<ip-address>/error
# Inspect pod logs from the dashboard
```
