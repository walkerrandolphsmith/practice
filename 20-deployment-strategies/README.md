# Kubernetes Deployment Strategies

`Recreate`: Destroy all old then deploy all new

`Ramped`: Rollout one by one destroy old and deploy new

`Blue Green`: Deploy all new then destroy all old

`Canary`: Deploy new to random subset of users

`A/B Testing`: Deploy new to targeted subset of users

`Shadow`: Mirror traffic to old and new

```
minikube start --vm=true --memory 8192 --cpus 2
minikube addons enable ingress
minikube addons enable metrics-server
kubectl apply -f namespace.yml
helm install prometheus --namespace=monitoring stable/prometheus
helm install grafana --namespace=monitoring --set=adminUser=admin --set=adminPassword=admin --set=service.type=NodePort stable/grafana
minikube service grafana -n monitoring
```

## Recreate

Version 1 of the software is available for customers.
We build new features and enhance existing features and have version 2 ready to go...
In order to update the instance we have to run setup which makes the instance temporarily unavailable.
Once steup completes version 2 is available.
