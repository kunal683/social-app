const Post = require("../../models/post");
const auth = require("../../utils/auth")

module.exports = {
  Query: {
    getuserpost: async () => {
      try {
        const data = await Post.find().sort({ createdAt: -1 });
        return data;
      } catch (err) {
        throw new Error(err);
      }
    },
    getpost: async (parent, { postid }) => {
      try {
        const data = await Post.findById(postid)
        if (!data) {
          throw new Error('Post doesnot exits')
        }
        else {
          return data;
        }

      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      try {
        const user = await auth(context)
        if (!user) {
          throw new Error('User doesnot exists')
        }
        if(body.trim ===""){
          throw new Error('Body mustnot be empty')
        }
        const newpost = new Post({
          body: body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        })
        const savedpost = await newpost.save()

        return savedpost
      } catch (err) {
        throw new Error(err)
      }

    },
    deletePost: async (_, { postid }, context) => {
      try {
        const user = await auth(context)

        if (!user) {
          throw new Error('User doesnot exists')
        }
        const newpost = await Post.findById(postid)
        if (newpost.username === user.username) {
          await newpost.delete()
          return 'Post deleted'
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    likepost: async(_,{postid}, context) => {
      const {username } = auth(context)
      
      const post = await Post.findById(postid)
      if(post){
        if(post.likes.find((like)=>like.username===username)){
          post.likes = post.likes.filter((like)=>like.username!=username)
        }
        else{
          post.likes.push({
            username : username,
            createdAt : new Date().toISOString()
          })
        }
        await post.save()
        return post
      }else throw new UserInputError('Post not found')
    }
  }
};