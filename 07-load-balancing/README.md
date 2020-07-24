# Load Balancing

We now have a portable service whose functionality we can depend on. We are running a container in production and serving up happy customers, cheers.
Your service is getting popular. Too popular. Your service starts dropping requests because it can't handle the usage.

We're going to solve this problem by managing the load differently. We can run multiple instances of our service simultaneously and have a lightweight load balancer redirect customer traffic to an idle instance of your service.

Let's take a look at an Nginx configuration that can load balance our traffic

```
events {}

http {
    # don't send the nginx version number in error pages and Server header
    server_tokens off;

    upstream api {
        server api:3000 max_fails=3 fail_timeout=30s;
    }

    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/javascript text/xml application/xml application/xml+rss application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;

    server {
        listen              443 ssl http2;
        server_name         localhost;
        keepalive_timeout   70;

        ssl_certificate     /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_ciphers         HIGH:!aNULL:!MD5;  # update to better ciphers

        add_header Strict-Transport-Security "max-age=6000; includeSubdomains; preload";

        add_header X-Frame-Options SAMEORIGIN;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";

        location / {
            proxy_pass http://api/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

Next, we'll create a Dockerfile to set up the for Nginx. Let's gloss over the SSL configuration.
One thing to note is this in combination with Nginx listening on port 443 will enable us to leverage secure traffic over https

```
FROM nginx:alpine

RUN mkdir /etc/nginx/ssl

RUN apk add --update openssl

RUN openssl req \
-x509 \
-newkey rsa:4086 \
-subj '/CN=localhost' \
-keyout /etc/nginx/ssl/key.pem \
-out /etc/nginx/ssl/cert.pem \
-days 365 \
-nodes \
-sha256
```

Since we intend to have multiple instances of our service responding to traffic, let's add an endpoint that can return the HOSTNAME of the "physical" machine it runs on.

```
const port = 3000;
const containerId=process.env.HOSTNAME;
app.get('/healthcheck', (request, response) => response.status(200).send(containerId));

app.listen(port, function() {
    console.log(`Now accepting requests at http://${containerId}:${port}`);
});
```

Now we can build the images for our service and the load balancer, start the containers, and scale the number of instances of our service in one command:

```
docker-compose up --scale api=5
```

Now let's make a request to the health check endpoint multiple times to see Nginx round-robin the traffic.
curl -k https://localhost:443/healthcheck
