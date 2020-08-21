# Stateful Workloads

So far we've added workloads to Kubernetes that can be replicated and scaled. Multiple instances of our HTTP server are seemingly identical. Kubernetes has handled load balancing the traffic across the instances and exposing only one endpoint for a consumer. Therefore as a consumer it didn't matter if there were 2 instances or 12 instances running. Services that do not maintain state can scale such that all instances can be treated interchangably, crashed instances can be replaced, and start up and shut down order doesn't matter. Stateful services on the other hand don't share these characteristics.

Consider a HTTP service that keeps track of user sessions in memory. If the user's first request was made against an instance then subsequent requests would need to continue to be made against that instance since in memory sessions are not shared across instances. This is refered to as a "sticky" session. This stateful service would need its own identity so future requests from our user get routed to the correct instance. The epitome of stateful service is the database or clustered applications like Kafka that require quorum.

## Dedicated Storage Requirements

**StatefulSet** is a Kubernetes object that handles special requirements for dedicated storage, unique identity, and specific start up and shut down routines. We'll discuss a few different types of stateful applications and consider how Kubernetes handles each case using StatefulSets.

Let's take our legacy application from lesson 17. It logged messages to disk at `/var/log/`. This was a contrived application, but we can use it to demonstrate the need for each instance to need its own log of events. Instead of using the Deployment object we'll use the StatefulSet object. StatefulSets also allow specifiying a number of replicas, but now the associated pods will have names with ordinals 0, 1, 2, etc instead of random hashes. Every pod generated from the StatefulSet will include a label, `statefulset.kubernetes.io/pod-name`.

The service object has been used as a single point of contact for all instances of a our application. We will have to leverage a service that exposes a single, specific instance, also known as a headless service. The headless service will not be given a clusterIP, but will get instance specific DNS records. Since every pod generated from the StatefulSet has a unique identity we can select it with the generated label and match our service with a specific instance. We can avoid the Service from proxying traffic to nodes that do not contain our selected pod by setting the `externalTrafficPolicy` to `Local`

## Idenity Requirements

Let's consider a HTTP service that allows a user to authenticate themselves to establish their authorization to access certain resources on subsequent requests. For example a service that keeps track our **your** posts and only allows **you** to read them. Let's create this fictional service introducing the concept of "sticky" sessions, also known as session affinity. Once you log in the server establishes a session so subsequent requests made with your session cookie grant you access to your posts. It is important to note that the session will be established on a specific instance of our HTTP service meaning subsequent requests will have to be routed to the same instance on the same pod.

With this service you can login, logout, and view your posts. If you attempt to request for the posts before you are logged in your will receive a 403 status code.

curl ~/login?username=walker
curl ~/logout
curl ~/post

We'll use the ngnix ingress controller beacuse it already supports session affinity! We'll need to include the Kubernetes addon:

```
minikube addons enable ingress
```

Now using annotations we can configure the Ingress to route active sessions back to the instance that orginally established the session. The ingress is configured with an arbitrary host name. In our case we used `session-affinity.com`. We will need to map that hostname to the IP address of the Ingress.
Get the IP of the Ingress with:

```
kubectl get ingress
```

We could update our `/etc/hosts` file with `<ingress ip address> session-affinity.com` or use curl's `--resolve` flag!
Since our server will respond with the sesssion identifier in a cookie we'll need to store those in a file and include them in subsequent requests.
Fortunatly curl also supports this with `-c`, write cookies to file, and `-b` read cookies from file.

```
curl \
  -c cookie-jar.txt http://session-affinity.com/login?username=walker \
  --resolve session-affinity.com:172.30.67.137

 curl \
 -b cookie-jar.txt http://session-affinity.com/post \
 --resolve session-affinity.com:172.30.67.137
```

## Quorum

In some cases like database replication or clustered applications its important to distiniguish a leader from replicas. We'll use stateful sets to generate uniquiely identifiable pods for each mongo instance and use a sidecar to determine which are replicas.

```
# Apply our statefulset, headless service, and ClusterRoleBinding (needed by the sidecar)
kubectl apply -f db.yml
# Apply our deployment and service of our application
kubectl apply -f api.yml
# Expose our service outside the cluster
minikube service api --url
# Simulate interacting with our api
curl http://<ip:port>/user --request POST -- data '{"username": "walker"}' -H "ContentType: application/json"
curl http://<ip:port>/user
```
