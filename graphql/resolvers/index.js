const postresolver = require("./post");
const userresolver = require("./user");
const commentresolver = require("./comment");

module.exports = {
  Post : {
    likescount(parent){
      return parent.likes.length
    },
    commentcount : (parent)=> parent.likes.length
  },
  Query: {
    ...postresolver.Query,
  },
  Mutation:{
      ...userresolver,
      ...postresolver.Mutation,
      ...commentresolver.Mutation
  }
};
