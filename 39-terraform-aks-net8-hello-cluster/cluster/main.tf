provider "azurerm" {
    features {}

    subscription_id = var.subscription_id
    tenant_id = var.tenant_id
    client_id = var.client_id
    client_secret = var.client_secret
}

resource "azurerm_resource_group" "aks_rg" {
    name = "aks-rg"
    location = var.location
}

resource "azurerm_kubernetes_cluster" "aks_cluster" {
    name = "eastus-cluster"
    location = azurerm_resource_group.aks_rg.location
    resource_group_name = azurerm_resource_group.aks_rg.name
    dns_prefix = "terraformcertificationprefix"

    default_node_pool {
        name = "default"
        node_count = 2
        vm_size = "Standard_B2s"
    }

    identity {
        type = "SystemAssigned"
    }

    workload_identity_enabled = true
}