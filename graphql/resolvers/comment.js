const Post = require('../../models/post')
const auth = require('../../utils/Auth')


const { AuthenticationError, UserInputError } = require('apollo-server');
module.exports = {
  Mutation: {
    createComment: async (_, { postid, body }, context) => {
      const { username } = auth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }
      console.log(body)
      const post = await Post.findById(postid);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');

    },
    deleteComment: async (_, { postid, commentid }, context) => {
      const { username } = auth(context)

      const post = await Post.findById(postid)

      if (post) {
        const index = post.comments.findIndex(c => c.id === commentid)
        if(index < 0){
          throw new Error('Comment Doesnot exists')
        }
        if (post.comments[index].username === username) {
          post.comments.splice(index, 1)
          await post.save()
          return post
        }
        else {
          throw new Error('Wrong user,, Action not allowed')
        }

      }
      else {
        throw new Error('USer doesnot exists')
      }
    }
  }
}