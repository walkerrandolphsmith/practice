const httpServer = require('./server').httpServer;
const server = require('./server').server;
const PORT = process.env.PORT;

const handleSuccess = () => {
    console.log(
      `🚀 API Server is available on : http://localhost:${PORT}${
        server.graphqlPath
      }`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    );
  };
  

httpServer.listen({ port: PORT }, handleSuccess);