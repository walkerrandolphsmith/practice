# Telemetry

Imagine you have a defect causing your service to respond with a 500. Consider your code's memory consumption exceeds the available memory. Given the right information we may have predicted this situation and resolved it before it impacted the user.

It is critical to be able to anticipate issues and proactively address them. If we react to issues it is critical we have enough information to perform root cause analysis. In both cases we need information about our systems and their operations. Error logs, network traffic, OS metrics, cpu and memory usage and more. Not only do we need to caputre this information we need to aggregate it and present it in useful, digestable ways.

Prometheus can aggregate metrics from various systems. Grafana can visualize metrics from various data sources. We'll use both to collect cpu and memory usage from our pods and network traffic from our ingress. We'll use grafana to visualize them in charts.

## Deploying prometheus and grafana

We are going to monitor aspects of our Kubernetes cluster and our API. In order to accomplish this several new concepts will be introduced. In many ways this breaks the idea of learning concepts in isloation, but hand tight.

## Enable pods monitoring

We'll need a minikube addon to get cpu and memory usage from our pods.

```
minikube addons enable metrics-server
```

Once the addon is enabled and minikube is started the dashboard will now show CPU and memory usage graphs for each Pod and the Cluster.

## Create Namespace

Let's leverage kuberentes `Namespace` object to co-locate prometheus and grafana. Then apply our prometheus and grafana objects.

```
kubectl apply -f namespace.yml
```

## Depoloy prometheus

In order to install the prometheus monitoring and alerting application we are going to use a tool called Helm that is designed to manage Kubernetes applications by bundling all the details of into a manifest called a Chart. We will not need to curate and maintain a collection of yaml files for the prometheus objects.

### Install Helm

Install helm https://helm.sh/docs/intro/install/

### Install prometheus chart

```
helm install stable/prometheus
```

## Deplpoy grafana

```
kubectl apply -f grafana
```

## Setting up grafana

Next let's expose our grafana service and navigate to its UI. Since it was applied in the monitoring Namespace we'll have to specify it's in the non-default Namespace.

```
minikube service grafana -n monitoring
```

### Adding data sources

Login with username `admin` and password `admin` we'll change the password to `adminadmin`.  
Currently there are no metrics to visualize. We'll need to add prometheus as a data source via `Settings > Data Source > Add`
Give it a type of prometheus and the url of `http://prometheus-server:80`

### Import dashaboards

Browse grafana's library of dashboards at https://grafana.com/grafana/dashboards/  
Import dashboard 3662 to show prometheus metrics gathered about prometheus health.  
Import dashboard 10000 to show kubernetes cluster monitoring.

## Monitoring our API

Our API will have endpoints to simulate 200s, 500s, and high cpu intense operations. Deploy the API using `kubectl apply -f api.yml`.

It will use an ngnix ingress which can be monitored by prometheus out of the box!

Import dashboard 9614 in grafana to visualize the ingress traffic. We can see metrics like request volume and endpoint success rate.

Let's simulate network traffic with `./simulate-traffic.sh`. Allow the script to make requests to our API and observe our graphs respond!
