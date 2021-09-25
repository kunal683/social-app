const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { Secret_key } = require("../../config")
const user = require("../../models/user");
const { UserInputError } = require("apollo-server");
const { validateinput, validatelogininput } = require("../../utils/validators");


module.exports = {
  userlogin : async(
    parents, {username, password}
  )=>{
    const {errors, valid } = validatelogininput(username, password)

    if(!valid){
      throw new UserInputError("Errors",{
        errors
      })
    }

    const newuser = await user.findOne({username})

    if(!newuser)
    {
        errors.general = "Username not found"
        throw new UserInputError("Errors",{
          errors
        })
    }
    const match = await bcrypt.compare(password, newuser.password)

    if(!match ){
      errors.general = "Password mismatch"
      throw new UserInputError("Errors",{
        errors
      })
    }
    const token = jwt.sign({ 
      username: username,
      email : newuser.email,
      id : newuser.id
       }, Secret_key);
      
    return {
      id: newuser.id,
      username: newuser.username,
      token,
      email : newuser.email,
      createdAt: newuser.createdAt
    }

  },
  userregister: async (
    parent,
    { userinput: { email, username, password, confirmpassword } }
  ) => {

    const checkuser = await user.findOne({ username })
    const { valid, errors } = validateinput(username, email, password, confirmpassword)
    if (!valid) {
      throw new UserInputError("Errors", {
        errors
      })
    }
    if (checkuser) {
      throw new UserInputError("username is taken", {
        errors: {
          username: "this username is taken"
        }
      })
    }
    const newpass = await bcrypt.hash(password, 12);

    const newuser = new user({
      username: username,
      email: email,
      password: newpass,
      createdAt: new Date().toISOString(),
    });

    const saveduser = await newuser.save();
    const token = jwt.sign({ 
      username: saveduser.username,
      email : saveduser.username,
      id : saveduser.id
       }, Secret_key,
       { expiresIn: '1h' });


    return {
      id: newuser.id,
      username: newuser.username,
      token,
      email : newuser.email,
      createdAt: newuser.createdAt
    }


  },
};
