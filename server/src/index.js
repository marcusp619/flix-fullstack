const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const isEmail = require("isemail");
const MovieAPI = require("./datasources/movie");
const VideoAPI = require("./datasources/video");

const app = express();

const store = mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true
});

const server = new ApolloServer({
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");

    if (!isEmail.validate(email)) return { user: null };
  },
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
