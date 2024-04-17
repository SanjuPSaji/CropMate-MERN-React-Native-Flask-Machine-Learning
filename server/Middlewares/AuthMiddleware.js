const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const {tok} = req.body
  console.log(tok)
  if (!tok) {
    
    console.log("aefedf")
    return res.json({ status: false })
  }
  jwt.verify(tok, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if(user){
        console.log(user)
      }
      else{
        console.log("aefedf")
      }
      
      if (user) return res.json({ status: true, user: user.name, id: user.id })
      else  return res.json({ status: false })
    }
  })
}

module.exports.userVerificationMobile = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.name, id: user.id })
      else return res.json({ status: false })
    }
  })
}