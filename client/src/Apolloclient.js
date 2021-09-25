import { ApolloClient, ApolloProvider, InMemoryCache  } from "@apollo/client";

import App from "./App"
import React from "react";
import ReactDOM from "react-dom";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  });

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)