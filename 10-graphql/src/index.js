const httpServer = require("./server").httpServer;
const webSocketServer = require("./server").webSocketServer; // why are there both server and http? They come from the same file.. better names?
const PORT = process.env.PORT;

const handleSuccess = () => {
  console.log(
    `🚀 API Server is available on : http://localhost:${PORT}${webSocketServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${webSocketServer.subscriptionsPath}`
  );
};

httpServer.listen({ port: PORT }, handleSuccess);
