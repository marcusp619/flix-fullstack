const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const isEmail = require("isemail");
const MovieAPI = require("./datasources/movie");
const VideoAPI = require("./datasources/video");
const UserAPI = require("./datasources/user");
const url = "mongodb://localhost:27017/test";
const connect = require("./connect");
const User = require("./datasources/models/userSchema");
const app = express();

const store = connect(url);

const server = new ApolloServer({
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");

    if (!isEmail.validate(email)) return { user: null };
    const user = store.then(async connection => {
      const user = await User.findOneAndUpdate(
        { email: email },
        { email: email },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec();

      return { user: { ...user } };
    });

    return user;
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieAPI: new MovieAPI(),
    videoAPI: new VideoAPI(),
    userAPI: new UserAPI({ store })
  })
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
