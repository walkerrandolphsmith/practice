const http = require("http");
const express = require("express");
const ApolloServer = require("apollo-server-express").ApolloServer;
const gql = require("apollo-server-express").gql;
const combineResolvers = require("graphql-resolvers").combineResolvers;
const mongoose = require("mongoose");
const DataLoader = require("dataloader");

const connect = () =>
  mongoose.connect(process.env.MONGO_URI, {
    poolSize: 5,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
  });

connect();

const ObjectId = mongoose.Schema.Types.ObjectId;
const UserModel = mongoose.model(
  "User",
  mongoose.Schema({
    username: {
      type: String,
      unique: true,
    },
  })
);
const PostModel = mongoose.model(
  "Post",
  mongoose.Schema({
    content: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
  })
);

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
`;
// stay consistent with names//
const postSchema = gql`
  extend type Query {
    posts(limit: Int!, next: String): PostConnection!
    post(id: ID!): Post!
  }
  extend type Mutation {
    createPost(content: String!): Post!
    deletePost(id: ID!): Boolean!
    updatePost(id: ID!, content: String!): Post!
  }
  type PostConnection {
    edges: [Post!]!
    next: String
  }
  type Post {
    id: ID!
    content: String!
    author: User!
    createdAt: String!
  }
  extend type Subscription {
    messageCreated: PostCreated!
  }
  type PostCreated {
    post: Post!
  }
`;

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
`;

const userResolver = {
  Query: {
    user: async (_, { id }, { models }) => {
      return await models.user.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { username }, { models }) => {
      if (!username) {
        throw new Error("Post can not be empty");
      }

      const user = await models.user.create({ username });
      return { id: user._id, username: user.username };
    },
  },
  User: {
    posts: async (user, _, { models }) => {
      return await models.user.findAll({ userId: user.id });
    },
  },
};

const postResolver = {
  Query: {
    post: async (_, { id }, { models }) => await models.post.findById(id),
    posts: async (parent, { limit, next }, { models }) =>
      cursorPagination(parent, { limit, next }, models.post),
  },
  Mutation: {
    createPost: async (_, { content }, { models }) => {
      if (!content) {
        throw new Error("Post can not be empty");
      }
      return await models.post.create({
        content,
        userId: "5f24129678f24f0011bb0f96",
      });
    },
    deletePost: combineResolvers(
      async (_, params, { models }) => {
        const isNotAuthor = false;
        if (isNotAuthor) {
          throw new ForbiddenError("Must be author to remove");
        }

        return skip;
      },
      async (_, { id }, { models }) => {
        return await models.post.deleteOne({ id });
      }
    ),
    updatePost: async (_, { id, content }, { models }) => {
      const findBy = { id };
      return await models.post.update({ content }, findBy);
    },
  },
  Post: {
    author: async (post, _, { loaders }) => loaders.user.load(post.userId),
  },
};

const cursorPagination = async (_, { limit, next }, Model) => {
  const findAll = {};
  const findNextSet = { _id: { $lt: next } };
  const findBy = next ? findNextSet : findAll;
  const sortBy = { _id: -1 };
  const items = await Model.find(findBy).sort(sortBy).limit(limit);
  const total = await Model.find(findBy).sort(sortBy).count();
  const remaining = total - limit;
  const newNext = remaining > limit ? items[items.length - 1]._id : null;
  return {
    edges: items,
    next: newNext,
  };
};

const webSocketServer = new ApolloServer({
  typeDefs: [rootSchema, userSchema, postSchema],
  resolvers: [postResolver, userResolver],
  context: async (_) => {
    const batchUsers = async (keys) => {
      const distinctKeys = [...new Set(keys)];
      return await UserModel.find({ _id: { $in: distinctKeys } });
    };
    return {
      loaders: {
        user: new DataLoader((keys) => batchUsers(keys)),
      },
      models: {
        user: UserModel,
        post: PostModel,
      },
    };
  },
  formatError: (err) => err,
});

const app = express();

webSocketServer.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
webSocketServer.installSubscriptionHandlers(httpServer);

exports.httpServer = httpServer;
exports.webSocketServer = webSocketServer;
