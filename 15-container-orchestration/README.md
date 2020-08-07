# Container Orchestration

Our system has grown from one docker container running our service to one container for our service, one container for our persistent storage, multiple containers for our persistent storage replicas, one contiainer for setting up our persistent storage containers, one container for viewing telemtry... and up until now we have been manging all these containers with docker compose; scaling containers, establishing networks, defining healthchecks, injecting environment variables, etc.

We have managed starting multiple containers with docker compose to avoid running multiple docker run commands. However we still have overhead with our workflow. Consider having to monitor containers and erstarting any that crash and stop. If you need to scale a particular service when traffic spikes we can use the `--scale` flag, but how to we prevent our load balancer from routing to the new contaniers before they are ready. How do we tell the already running load balancer how to route to the new containers or stop routing traffic to containers that have long been stopped?

Docker compose was a useful tool to start multiple containers, but we'll need to mature to a platform to handle situations that are more complex than simplying starting containers. Kubernetes enables us to run a distributed system _resiliently_. It provides service discovery, load balancing, automated roll outs and roll backs, self healing and more.

## Dependencies

TO run Kubernetes locally in a development enviornment we'll need to install Minikube.

When starting minikube run

```
 minikube start
 minikube docker-env
```

## Experiment

First let's containerize an http server that exposes a port and responds to ~/healthcheck endpoint with Hello World.
Kubernetes will run on a "node" and manage "pods" that will each have their own IP address and can run containers in isolation. We want our containerized HTTP service to run in a kubernetes pod.

In order to get our container running within Kubernetes we will define a deployment object that describes our system. Once the deployment is applied kubernetes will ensure that the system is operating under the described conditions. As containers or pods crash and fail healthchecks the kubernetes deployment controller will create new pods and their containers to reconcile any differences between its current operating conditions and the described conditions.

Our HTTP service simply response to an endpoint with the IP address of the machine it is running on. In this case the container is running within a pod and the pod has its own IP adress. In order for our service to know the IP address of the Pod we can use the Kubernetes Downward api to inject metadata about the Pod into the container.

```
apiVersion: apps/v1
kind: Deployment
metadata: # info to help identify object
  name: api
  labels: # arbitrary key value pairs to provide objects with meaning
    name: api
    maturityStage: dev
    release: stable
    teir: backend

spec: # desired state for object
  selector:
    matchLabels: # label selectors are intended to match multiple objects
      name: api
  replicas: 1
  template:
    metadata:
      labels:
        name: api
    spec:
      containers:
      - name: api-container
        image: walkerrandolphsmith/hello-container-orchastration-with-k8s:1.0
        imagePullPolicy: Always
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
          - name: GET_HOSTS_FROM
            value: dns
          - name: MY_POD_NAME
            valueFrom:
              fieldRef:
                fieldPath:
                  metadata.name # Expose pod information to container via DownwardAPI
        ports:
          - containerPort: 3000
```

Now we can apply our deployment

```
kubectl apply -f api.deployment.yml
```

The Kubernetes controller will now ensure the container runs within a pod. When the container is running it will be accessible from within the pod's network. Since pods can come and go due to failures and "scaling back" we would need to keep track of the pods' ip addresses. Fortunately Kubernetes gives all pods a single DNS and provides "services" to handle service discovery. Up until now we have been using the term service to represent our API applicaltions. In this context service is a Kubernetes object. This is not the only time a term will have dual meaning in computer science. Knowing how that term is used in context will be important. So, we can describe a Kubernetes service like we did the deployment

```
apiVersion: v1
kind: Service
metadata:
  name: api
  labels:
    name: api
    maturityStage: dev
    release: stable
spec:
  type: NodePort # Expose to outside the cluster on <NodeIP>:<NodePort>
  ports:
    - port: 3000 # targetPort field defaults to this value as well
  selector:
    name: api
```

They type NodePort here is important because it exposes the pods external to the Kubernets "node". This will allow our host machine to reach our HTTP service through the Kubernetes node's IP address. In order to get the node's IP address run the following:

```
minikube service api --url
```

Now we can make requests to our HTTP sevice:

```
curl http://<ip-address>:3000/healthcheck
```

We can scale our HTTP service to meet demands and allow Kubernets to handle service discovery. It will round robin requests across pods and keep track of which pod IP addresses are healthy and capable of handling traffic.

```
kubectl scale deployment -l name=api --replicas=10
```

Notice that I scaled the deployments that matched our label selector. This lightweight, but powerful, technique can enable scaling our alpha version while keeping a smaller number of beta versions of our HTTP service deployed. This is one of many scenarios and the labels will become critical.

Telemetry is fundametal to our abililty to support a complex system. Check out all the details of our Kubernetes enviornment by issuing:

```
minikube dashboard
```
