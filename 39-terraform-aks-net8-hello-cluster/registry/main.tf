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

resource "azurerm_container_registry" "acr" {
    name = "terraformcertificationregistry1"
    resource_group_name = azurerm_resource_group.aks_rg.name
    location = azurerm_resource_group.aks_rg.location
    sku = "Basic"
    admin_enabled = true
    tags = {
        environment = "dev"
    }
}