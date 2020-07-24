GraphQL is a specification used to declare data requirements over a network. We use a GraphQL client implementation called Apollo. [GQL concepts][] is a glossary of terms related to Apollo and Graphql that is a great starting point. Schemas, Queries, Mutations, Subscriptions, Resolvers, and more are covered.

Underfetching or over fetching is a typical issue with REST APIs. Over fetching occurs when the consumer needs a subset of the response from an API request but has no way to indicate to the server it will respond with more data than is needed before the request is made. Underfetching occurs when a consumer needs to make multiple successive, ordered API requests using some information from the previous request's response in order for the next request to be formed. REST APIs can support specifying what data requirements are needed from the consumer using query parameters however there is not a standardization on this practice and any REST API that supports it requires the consumer to "learn" their data model. GraphQL itself is a specification to declare data requirements and therefore the consumer can learn the specification and it will be transferable to other graphql APIs.

We can also use GraphQL to enable querying for complex graphs of data from our backend while taking advantage of caching techniques. For example, imagine a traditional REST API that retrieves a list of users and a subsequent request made for a specific user you are chatting with. When the list and specific user requests return different data how do we update the specific user in the list? How can we leverage cache and not make a full network request for the specif user if their information is available in the first request for the list of users? Apollo enables use to solve this issue in elegant ways.

Here is an example query for messages' text content and the author's username. GraphQL allowed us to specify exactly what information about a message we needed, excluding other properties of the message we did not care to retrieve.

```gql
{
  messages(cursor: 1, limit: 1)  {
    edges {
        text,
        author {
            username
        }
    }
}
```

We can make HTTP requests to our server via standard techniques:

```
curl localhost:3000/graphql \
    --request POST \
    -H "Content-Type: application/json" \
    --data '{"query": "{messages(cursor: 1, limit: 1) { edges { text, author { username } } } }"}'
```

```
{
  "data": {
    "messages": {
      "edges": [
        {
          "text": "This is my first message",
          "author": {
            "username": "walker"
          }
        }
      ]
    }
  }
}
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

Using a schema definition language we can describe a user, a post, and their relationship in a way that will strongly type the graphQL API. We are able to describe the domain of users authoring posts independent of how we retrieve and store data to satisfy this contract.

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

Now we need to "back" this contract with data fetching so that the api can actually respond with data when requests are made. Resolvers are functions that can return data from any source, local cache, multiple databases, other APIS, etc. For now, let's stub out the resolvers and not fetch any data.

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

Querying for posts presents another interesting situation; requesting too much data. The performance of any client would be poor if we requested posts and all 100 million were returned. We need a way to request posts and supply the maximum number. This number is likely informed by how many posts a client can present to the user in a meaningful way. This number may be different on a phone or laptop.
