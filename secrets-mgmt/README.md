# Secrets Management

Note: Previous lessons have largely ignored hardening guides for setting up mongodb, kafka, etc. We also haven't coverd signing JWT tokens with a secret key. We might need to touch on those subjects for secrtes management to makes sense.

As our system grows we juggle sensitive environment variables, database credentials, and auth tokens actively ignorning them from git history, ensuring they don't get included in docker images or leak out in plain text. Vault provides a suite of capabilites including storing sensitive data, controlling access to those secrets, providing audit logs of who accessed what secrets when, dynmaic secrets with built in expirations, and more. Let's take a very small step and start by installing vault in the simpilest way, storing a secret, accessing it via an HTTP request, and viewing the UI.

```
docker-compose up --build -d
docker-compose exec vault bash
vault operator init

#Write a secret
curl http://locahost:8200/v1/secret/auth \
    -H "X-Vault-Token: <root-token>" \
    -H "Content-Type: application/json" \
    --request POST \
    --data '{"data": {"AUTH_TOKEN": "secret"}}'
#Read the secret
curl http://localhost:8200/v1/secret/auth -H "X-Vault-Token: <root-token>"
```
We can also view the user interface via `http://localhost:8200/ui/`