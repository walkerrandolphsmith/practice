# Container Orchestration
Our system has grown from one docker container running our service to one container for our service, one container for our persistent storage, multiple containers for our persistent storage replicas, one contiainer for setting up our persistent storage containers, one container for viewing telemtry... and up until now we have been manging all these containers with docker compose; scaling containers, establishing networks, defining healthchecks, injecting environment variables, etc.

We have managed starting multiple containers with docker compose to avoid running multiple docker run commands. However we still have overhead with our workflow. Consider having to monitor containers and erstarting any that crash and stop. If you need to scale a particular service when traffic spikes we can use the `--scale` flag, but how to we prevent our load balancer from routing to the new contaniers before they are ready. How do we tell the already running load balancer how to route to the new containers or stop routing traffic to containers that have long been stopped? 

Docker compose was a useful tool to start multiple containers, but we'll need to mature to a platform to handle situations that are more complex than simplying starting containers. Kubernetes enables us to run a distributed system *resiliently*. It provides service discovery, load balancing, automated roll outs and roll backs, self healing and more. 

## Dependencies
TO run Kubernetes locally in a development enviornment we'll need to install Minikube.

## Experiment
First let's containerize an http server that exposes a port and responds to ~/healthcheck endpoint with Hello World.

