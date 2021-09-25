const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const gql = require("graphql-tag");

const { url } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context : ({req}) => ({req})
});

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    server.listen({ port: 4000 }).then((res) => {
      console.log("server running");
      console.log("mongoose running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
