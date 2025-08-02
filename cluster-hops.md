Why is your microservice leaving the cluster to call its neighbor?

If you're using App Configuration or a similar setup to help microservices discover each other, it's easy to end up with something like this:

1. A service makes a request using a fully qualified domain
2. DNS resolves the name
3. The request leaves the cluster and hits your external front door
4. It re-enters the same cluster and finally reaches the destination service

It works, but it’s inefficient.

It’s like walking outside to get your mail, seeing your neighbor standing in their yard, and calling them on the phone instead of just saying “Hey.”

If your services live in the same Kubernetes cluster, let them talk directly. Use internal DNS like my-service.namespace.svc.cluster.local or cluster-local service discovery to keep traffic inside the network.

You'll avoid unnecessary latency, reduce external dependencies, and simplify the path between services.

#SoftwareDesign #PlatformEngineering #CloudNative #TechLeadership
