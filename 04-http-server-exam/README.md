# HTTP Server

URL format follows [RFC 3986](https://tools.ietf.org/html/rfc3986):  
`scheme://host[:port][/path]`

https://localhost:3000/user?username=kyle&status=active
\_**\*\*\*\***\_\_\_\_**\*\*\*\***/\_\_/\_\***\*\*\*\*\*\*\***\_\***\*\*\*\*\*\*\***/
server URL endpoint query parameters

We will create a service that can

- Query for all users
- Query for users filtered by username
- Query for a specific user by ID
- Create a new user
- Delete an existing user

```
paths:
    /user:
        get:
            summary: Get users by ID
            parameters:
                - in: query
                  name: username
                  schema:
                    type: string
                  required: false
                  description: human friendly, unique username of the user to filter by
            responses:
                200: # Response
                    description: OK
                    content: # Response Body
                        application/json: # Media type
                        schema:
                            type: object
                            properties:
                                id:
                                    type: integer
                                username:
                                    type: string
                            example:
                                { 1: { username: 'kyle', }, 2: { username: 'walker' }}
                404:
                    description: A user with the specified username was not found
                    content:
                        application/json
                        schema:
                            type: object
                            properties:
                                reason:
                                    type: string
                            example:
                                { reason: "A user with the specified username was not found" }
        post:
            summary: Add a new user with unique username
            requestBody:
                description: User details
                required: true
                content:
                    application/json
                    schema:
                        type: object
                        properties:
                            username:
                                type: string
            responses:
                201:
                    description: Created
                    content:
                        application/json
                        schema:
                            type: object
                            properties:
                                id:
                                    type: integer
                                username:
                                    type: string
                            example:
                                { id: 1, username: 'kyle' }
                400:
                    description: Bad Request. username must be a non-empty string
                    content:
                        application/json
                        schema:
                            type: object
                            properties:
                                reason:
                                    type: string
                            example:
                                { reason: 'Username must be a non-empty string' }
                409:
                    description: Resource conflict. User already exists.
                    content:
                        application/json
                        schema:
                            type: object
                            properties:
                                reason:
                                    type: string
                            example:
                                { reason: 'User already exists' }
    /user/{id}:
        get:
            summary: Get user details by ID
            parameters:
                - in: path
                  name: id
                  required: true
                  schema:
                      type: integer
                      minimum: 1
                  description: The user ID
            responses:
                200:
                    description: 'OK'
                    content:
                        application/json
                        schema:
                            type: object
                            properties:
                                id:
                                    type: integer
                                username:
                                    type: string
                            example:
                                { id: 1, username: 'kyle' }
                404:
                    description: A user with the specified ID was not found
                    content:
                        application/json
                        schema:
                            type: object
                            properties:
                                reason:
                                    type: string
                            example:
                                { reason: "A user with the specified ID was not found" }
        delete:
            summary: Delete a user by ID
            repsonses:
                200:
                    description: 'OK'
                    content:
                        application/json
                        schema:
                            type: string
                            properties:
                                id:
                                    type: integer
                                username:
                                    type: string
                            example:
                                { id: 1, username: 'kyle' }
                404:
                    description: A user with the specified ID was not found
                    content:
                        application/json
                        schema:
                            type: object
                            properties:
                                reason:
                                    type: string
                            example:
                                { reason: "A user with the specified ID was not found" }
```

As a consumer I can do the following:

```
curl http://localhost:3000/user
curl http://localhost:3000/user/:id
curl http://localhost:3000/user/:id --request DELETE
curl http://localhost:3000/user -H "Content-Type: application/json" --request POST --data '{ "username": "walker" }'
```
