const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, name, createdAt } = req.body; //The user's inputs are obtained from the req.body
    const existingUser = await User.findOne({ email }); //check the email to make sure no past registrations have been made
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, name, createdAt });
    const token = createSecretToken(user._id); //creating unique token for the user
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user,token:token });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Invalid Email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password' }) 
    }
     const token = createSecretToken(user._id);
    //  res.cookie("token", token, {
    //    withCredentials: true,
    //    httpOnly: false,
    //  });
     res.status(201).json({ message: "User logged in successfully", success: true,user, token: token });
     next()
  } catch (error) {
    console.error(error);
  }
}