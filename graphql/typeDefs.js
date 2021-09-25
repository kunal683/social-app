const { gql } = require("apollo-server");

module.exports = gql`

  type Comment {
    id : ID!
    body: String!
    username : String!
    createdAt : String!
  }
  type Likes {
    id: ID!
    username : String!
    createdAt : String!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments : [Comment]!
    likes : [Likes]!
    commentcount : Int!
    likescount : Int!
  }


  type Query {
    getuserpost: [Post]
    getpost(postid : String!) :  Post!
  }
  input Userinput {
    email: String
    username: String!
    password: String!
    confirmpassword: String!
  }
  type users {
    id : ID!
    username : String!
    token : String!
    email : String!
    createdAt : String!
  }
 
  type Mutation {
    userregister(userinput: Userinput): users!
    userlogin (username : String!, password : String!) : users!
    createPost(body: String!) : Post!
    deletePost(postid : ID!) : String!
    createComment(postid: String!, body: String!): Post!
    deleteComment(postid : ID!, commentid : ID!) : Post!
    likepost(postid : ID!) : Post!
  }
`;
