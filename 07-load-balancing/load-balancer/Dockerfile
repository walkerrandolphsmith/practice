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

COPY nginx.conf /etc/nginx/nginx.conf