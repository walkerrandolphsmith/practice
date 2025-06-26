# dotnet-8-hello-world

A Hello World Web API created by .NET 8.0

# Create a global json

dotnet new globaljson --sdk-version 8.0.203 --force

# Functionality of the Web App

- Just a Hello World Web API

# Tech used for creating the Web App

- A .NET 8 Web API
- A traditional Webhotel for hosting
- VS Code

# Development

dotnet run

# Production

Create a self contained build for production at the remote server / traditionel web hotel

dotnet publish helloworld.csproj --configuration Release --runtime win-x86 --self-contained

Upload the build to remote server

At my remote servers the web.config needs to be without the folowing:

hostingModel="inprocess"

