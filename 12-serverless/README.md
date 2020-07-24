# Serverless

Serverless is an execution model where you pay per request and not for server idle time. Generally, you can develop your application abstracted from the notion of servers.

## Experiment

We're going to stand up a serverless graphql service on AWS lambda that can respond with "hello world". This experiment relies on things outside the codebase itself unlike many of the lessons. First, we'll need an AWS account, set up an IAM associated with a Group that has the correct policies that will grant us access to various aspects of AWS.

The docker file will build an image with nodejs and a global package, `serverless`. The serverless package will zip the artifacts, and uploads it to a new S3 bucket. Then, it creates a Lambda function with those artifacts, and if successful, outputs the HTTP endpoint URLs to the console.

The generated GET URL will navigate to the graphql playground.

```
docker build . -t serverless:1.0
docker run --env AWS_ACCESS_KEY_ID=XXX --env AWS_SECRET_ACCESS_KEY=XXX serverless:1.0
```
