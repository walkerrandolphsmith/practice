# Graphql

Consider a system that allow users to author posts.

- A person can author a post that contains textual content
- A person can view a set of posts and their author's username

## A RESTful approach

A REST API may allow you to query for posts and get back a normalized representation of each post. You see the content of the post and the id of the author.

```
curl ~/post

[
  { id: 1, content: "Sammy's first post", authorId: 2 },
  { id: 2, content: "Sally's first post", authorId: 1 }
]
```

If you want to know the author's username for each post we'll need make a query for each unique author.

```
curl ~/user/1
curl ~/user/2

{ id: 1, username: "Sally", avatar: "BASE64-encoded-string" }
{ id: 2, username: "Sammy", avatar: "BASE64-encoded-string" }
```

- Network latency. Every HTTP request over the network paid a cost in time to transmit the request and receive a response.
- Under fetching. We didn't get all the data we needed about the author in the first request and will have to fetch more data
- Over fetching. Now that we fetch data for each author the response contained all aspects of the author when we only needed the username
- Rate limiting. Some apis limit the number of requests in a given time frame and the subsequent requests to author add up fast.

Overfetching can be addressed in REST APIs by providing query parameters to specify what aspects of the resource are desired in the response, but this is non-standard and requires the consumer to "learn" the convention and underlying data model

## Graphql

Graphql is a specification to declare data requirements. We can adhere to this spec to enable querying for graphs of data that contain only the data we request.

```
{
  posts(cursor: 1, limit: 2)  {
    content,
    author {
        username
    }
}

[
  { id: 1, content: "Sally's first post", author: { username: "Sally" } },
  { id: 2, content: "Sammy's first post", author: { username: "Sammy" } },
]
```

Instantly we addressed

- reducing network latency
- no more under fetching
- no more over fetching
- reduce number of requests that count toward rate limits

Implemented over standard HTTP protocol:

```
curl localhost:3000/graphql \
    --request POST \
    -H "Content-Type: application/json" \
    --data '{"query": "{posts(cursor: 1, limit: 1) { edges { content, author { username } } } }"}'
```

## More reading

[Batch queires][] can enable a client to merge several graphql queries into a single HTTP request. Since bandwidth and network traffic is previous this can be advantageous.

[Persisted queries][] is a technique to statically determine all possible queries that can be made at build time and associate them with unique keys. This allows a POST request with a complex query to be converted to a GET request by id saving tons of upload bits! Unfortunately, it can not be used in concert with batched queries at the moment.

[Schema Stitching][] is the technique of creating a single GraphQL schema from multiple separate GraphQL APIs. This allows us to break our services into smaller units and compose their APIs together!

[schema stitching]: https://www.apollographql.com/docs/graphql-tools/schema-stitching.html
[batch queires]: https://blog.apollographql.com/batching-client-graphql-queries-a685f5bcd41b
[persisted queries]: https://www.apollographql.com/docs/engine/proxy/guides.html#automatic-persisted-queries
[gql concepts]: https://www.apollographql.com/docs/resources/graphql-glossary.html

## Exercise

We're going to simulate a system that has users who can author posts. We establish a few requirements so we can focus on:

- Create our schema to describe the domain
- Implementing resolvers responsible for populating the data for fields in our schema.
- Implementing database batching using DataLoader
- As a bonus, we'll implement a pagination technique for posts

### The Schema

Describe the domain (user, post, and their relationships) and strongly type the graphQL API.
Schema is independent of how we retrieve and store data to satisfy this contract.

```
const gql = require('apollo-server-express').gql;

const userSchema = gql`
extend type Query {
  user(id: ID!): User
}
extend type Mutation {
  createUser(username: String!): User!
}
type User {
  id: ID!
  username: String!
  posts: [Post!]
}
`

const postSchema = gql`
extend type Query {
  posts(limit: Int!, next: String): PostConnection!
  post(id: ID!): Post!
}
extend type Mutation {
  createPost(text: String!): Post!
  deletePost(id: ID!): Boolean!
  updatePost(id: ID!, text: String!): Post!
}
type PostConnection {
  edges: [Post!]!
  next: String
}
type Post {
  id: ID!
  text: String!
  author: User!
  createdAt: String!
}
extend type Subscription {
  messageCreated: PostCreated!
}
type PostCreated {
  post: Post!
}
`

const rootSchema = gql`
type Query {
  _: Boolean
}
type Mutation {
  _: Boolean
}
type Subscription {
  _: Boolean
}
`
```

### Resolvers

Supply requests with actual data.
Resolvers return data from any source, local cache, multiple databases, other APIS, etc.

```
const userResolver =  {
    Query: {
      user: async () => {
        return { id: 1, username: 'walker' }
      }
    },
    Mutation: {
      createUser: async () => {
        return { id: 1, username: 'walker' }
      },
    },
    User: {
      posts: async () => {
        return []
      },
    },
  }

const postResolver = {
    Query: {
        post: async () => {
          return { id: 1, text: 'First post' }
        },
        posts: async () => {
          return []
        }
    },
    Mutation: {
        createPost: async () => {
          return { id: 1, text: 'First post' }
        },
        deletePost: async () => {
          return { id: 1, text: 'First post' }
        },
        updatePost: async () => {
          return { id: 1, text: 'First post' }
        },
    },
    Post: {
        author: async () => {
          return { id: 1, username: 'walker' }
        }
    }
}
```

### GraphQL Server

Apollo Server is a library we can leverage to create a graphQL server that is compliant to the graphQL specification. For now, let's create the server providing it with our schema and resolvers.

```
const http = require('http');
const express = require('express');
const ApolloServer = require('apollo-server-express').ApolloServer;

const server = new ApolloServer({
    typeDefs: [
        rootSchema,
        userSchema,
        postSchema
    ],
    resolvers: [
        postResolver,
        userResolver
    ],
  });

const app = express();

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
```

## Fetching Data

Let's connect to a Mongo database to store and retrieve information about our posts and users. First, we'll need to create a database schema and establish a connection to the database.

```
const mongoose = require('mongoose');

const connect = () => mongoose.connect(process.env.MONGO_URI, {
  poolSize: 5,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500
})

connect();

const ObjectId = mongoose.Schema.Types.ObjectId;
const UserModel = mongoose.model('User',  mongoose.Schema({
  username: {
    type: String,
    unique: true,
  }
}));
const PostModel = mongoose.model('Post', mongoose.Schema({
  text: {
    type: String,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
  }
}));
```

Next Apollo Server enables users to provide `context` to resolvers. This context can be information from the HTTP request to our mongoose models. We'll pass our models into the context so the resolvers can resolve the data from the database.

```
const server = new ApolloServer({
    //...
    context: async ({ request }) => {
      return {
        models: {
          user: UserModel,
          post: PostModel
        }
      };
    }
  });
```

Now let's take a lot at the user resolver

```
const userResolver =  {
    Query: {
      user: async (_, { id }, { models }) => await models.user.findById(id)
    },
    Mutation: {
      createUser: async (_, { username }, { models }) => await models.user.create({ username })
    },
    User: {
      posts: async (user, _, models) => await models.posts.find({ userId: user.id })
    },
  }
```

The post resolver is fairly similar. However, `Query.posts` and `Post.author` are interesting.

### Batching

Our schema allows the user to query for posts and optionally include their author. It is possible that the same user authored many of the posts. With a naive resolver implementation, we may query the database for the same user several times. Instead, we can batch a user query for a unique set of authors of the posts. We'll leverage a multiple purpose tool called DataLoader to handle batching and inject these loaders into the `context`.

```
const DataLoader = require('dataloader');

const server = new ApolloServer({
    //...
    context: async (_) => {
      const batchUsers = async (keys) => {
        const distinctKeys = [...new Set(keys)];
        return await UserModel.find({ _id: { $in: distinctKeys } });
      }
      return {
        loaders: {
          user: new DataLoader(keys => batchUsers(keys)),
        },
        models: {
          user: UserModel,
          post: PostModel
        }
      };
    }
  });
```

Now the resolver implementation:

```
const postResolver = {
    //...
    Post: {
        author: async (post, _, { loaders }) => loaders.user.load(post.userId),
    }
}
```

### Pagination

Querying for posts presents another interesting situation; requesting too much data. The performance of any client would be poor if we requested posts and all 100 million were returned. We need a way to request posts and supply the maximum number. This number is likely informed by how many posts a client can present to the user in a meaningful way. This number may be different on a phone or laptop.Querying for posts presents another interesting situation; requesting too much data. The performance of any client would be poor if we requested posts and all 100 million were returned. We need a way to request posts and supply the maximum number. This number is likely informed by how many posts a client can present to the user in a meaningful way. This number may be different on a phone or laptop.
