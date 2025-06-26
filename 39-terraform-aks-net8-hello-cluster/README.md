```
choco install terraform
```

Login with `az cli`

```
az login
```

>  Select the account you want to log in with. For more information on login with Azure CLI, see https://go.microsoft.com/fwlink/?linkid=2271136 Unexpected exception while waiting for accounts control to finish: 'A specified logon session does not exist. It may already have been terminated.'. Status: Response_Status.Status_Unexpected, Error code: -2147023584, Tag: 528315211 Please explicitly log in with: az login

```
az login --use-device-code
```

Verify I'm logged in with this session
```
az account list --output table
```

Create a directory to create IAC for cluster provisioning
```
terraform init
```

Create plan
```
terraform plan --out="tfplan"
```

> Planning failed. Terraform encountered an error while generating this plan.  
> │ Error: subscription_id is a required provider property when  
> |  performing a plan/apply operation   
> │   with provider["registry.terraform.io/hashicorp/azurerm"],  
> │   on main.tf line 1, in provider "azurerm":  
> │    1: provider "azurerm" {  

Tried setting the environment variable `ARM_USE_AZURECLI_AUTH` to true, but never worked.


Knew this would perform operations as "me" which I didn't like anyway... so I created a service principal and used its creds

```
az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/b78350e9-3050-48ce-be2d-d1fa07a1c512"
```

Now I have some creds that are secrets that I don't want committed to repo. I know the resources will depend on some variable values so I add:

```
provider "azurerm" {
    features {}

    subscription_id = var.subscription_id
    tenant_id = var.tenant_id
    client_id = var.client_id
    client_secret = var.client_secret
}
```

Added strucutre/shape of variables to `variables.tf` and ignored their values in `variables.tfvars`

```
terraform apply -var-file="custom.tfvars"
```

I got some feedback that the cluster was provisioned. Cool.
Now can I interact with it...?

```
az aks get-credentials --resource-group aks-rg --name eastus-cluster
```

Can I use kube control? 
```
kubectl get nodes
```

> The term 'kubectl' is not recognized

Install it
```
az aks install-cli
```

Now I can see some nodes
> ks-default-24054675-vmss000000   Ready

Now I want to deploy an app to the cluster with a helm chart... intall helm?

```
choco install kubernetes-helm
```

```
helm create hello-net8 
```

Replaced the service.type from ClusterIP to LoadBalancer
so it can be reached outside the cluster.

Tried to replace the image.repository with an image like `mcr.microsoft.com/dotnet/samples:aspnetapp-nanoserver-ltsc2022` - I just want a prebuilt hello world web app that runs on port 80.

```
helm install
```

```
kubectl get pods
```

> NAME                          READY   STATUS    RESTARTS   AGE  
> hello-net8-6dc4549bd4-5pd8b   0/1     Running   0          12s


```
kubectl describe pod <pod-name>
```

> Successfully pulled image "mcr.microsoft.com/dotnet/samples:aspnetapp-nanoserver-ltsc2022" in 8.869s (8.869s including waiting). Image size: 175587432 bytes.
  Warning  Failed     23s                kubelet            Error: failed to create containerd container: mount callback failed on /var/lib/containerd/tmpmounts/containerd-mount1007702941: open /var/lib/containerd/tmpmounts/containerd-mount1007702941/etc/passwd: no such file or directory

Seems like we're trying to run Windows container images on Linux based K8s nodes.

Let's confirm

```
docker manifest inspect mcr.microsoft.com/dotnet/samples:aspnetapp-nanoserver-ltsc2022 --verbose
```

> "platform": {
>                         "architecture": "amd64",
>                         "os": "windows",
>                         "os.version": "10.0.17763.7434"
>                 }

Seems to check out... 
Can't find a sample, off the shelf image for a .net8 hello world web server. Let's make one?

I'll need a registry to push the image to once I have a hello world app and build an image.

I'll use terraform to provision the Azure container registry with `./registry`. 

Registry released...

Now for the .net8 hello world app. Grab the closest boilerplate that looks right after a skim dump it in `./hello-world-app`

Create the `Dockerfile` so we can build an image.



