# Webhooks

One way to encourage other services like Discord, Github, and others to build integrations with your system is to be an open platform.
As our system collects data and responds to user interaction other systems might find it interesting to respond to those events. For instance when a Facebook user likes a photo then it can be automatically saved to the user’s cloud photo album. Facebook could implement this automatic saving or it can open its platform with webhooks and allow the dozen cloud image storage companies to integrate with Facebook. In this example, if Facebook supports webhooks it might be possible to associate the event (a photo was liked by a user) with your cloud storage service's upload_photo endpoint.

## Webhook Subscriptions

Consider we have a system that produces events like liking a photo. We want to support users being able to trigger actions in external systems when a photo is liked. We can enable users to specify what events in our system should trigger the external system and what the URL of the external system in a subscription.

```
{
    url: 'http://external-cloud-storage-service.com/uploadImage/'
    eventTypes: ['LIKED_PHOTO']
}
```

Here the user must be knowledgable about the external service's `upload_image` endpoint. Perhaps a developer at this company has been tasked to create this integration because our photo-sharing system is becoming wildly popular.

Our system must have endpoints to support creating, deleting, updating, and querying subscriptions.

## System Events

Next we'll create an endpoint that represents a photo being liked that accepts the id of the photo in URL. `/like/:id`. Any time this endpoint is requested it represents a user liking a photo. If the user has created any webhook subscriptions we could query for them, determine if they created a subscription for this event, and make an HTTP POST to the subscription's specified URL with some information about the event, like the photo's id! The HTTP request and its payload about the event are considered the delivery of the webhook.

A naive approach would implement the subscription querying and matching in the `/like/:id` endpoint. What happens if there is a network issue between your service and the URL in the subscription? What if the user has created many subscriptions for the same event and you have to communicate with many external systems? We don't want to wait for these long operations to complete to impact the user's experience when liking a photo... could you imagine waiting 3seconds after liking a photo for it to show as liked!?

## Webhook Delivery

We can rely on a message queue, rabbitMQ, to keep track of the events in our system. Endpoints like `/like/:id` can remain lightweight by adding a message to the queue indicating an event occurred and quickly respond to the HTTP request. A separate system can process the events on the message queue by querying for webhook subscripts whose event type matches any given event in the queue and then delivering the webhook for any subscriptions that match.

## Experiment

Simulate the external system we intend to deliver webhooks to using this online tool: https://webhook.site/. This service will provide you with a URL that accepts POST requests and responds with a 200 status code.

Start our containers

```
docker-compose up
```

Create the following webhook subscription

```
curl http://localhost:3000/subscription \
    --request POST \
    -H "Content-Type: application/json" \
    --data '{ "url": "https://webhook.site/633ac1ed-0f69-455c-9cf8-c8155ce8a864", "eventTypes": ["LIKED_PHOTO"] }'
```

Now simulate the event of liking a photo

```
curl http://localhost:3000/like/123
```

We can see the message queue by navigating to http://localhost:15672/ and we can see the delivered webhooks at https://webhook.site/#!/633ac1ed-0f69-455c-9cf8-c8155ce8a864
