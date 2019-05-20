const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

const MovieAPI = require("./datasources/movie");
const VideoAPI = require("./datasources/video");

const app = express();

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieAPI: new MovieAPI(),
    videoAPI: new VideoAPI()
  })
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
