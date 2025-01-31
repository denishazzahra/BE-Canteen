require('dotenv').config();
const Admin = require('../model/Admin');
const {encryptText, decryptText} = require('../util/encryption')
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const {nanoid} = require('nanoid');
const key = process.env.TOKEN_SECRET_KEY;

// const registerHandler = async (req, res, next)=>{
//   try{
//     // take all user inputs
//     const {
//       fullName, email, username, password
//     } = req.body;

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 5);
    
//     // create new account
//     await Admin.create({
//       id: nanoid(16),
//       fullName: encryptText(fullName),
//       email: encryptText(email),
//       username: encryptText(username),
//       password : hashedPassword,
//     });

//     res.status(201).json({
//       status: "Success",
//       message: "Account registered successfully.",
//     })
//   }catch(error){
//     res.status(error.statusCode || 500).json({
//       status: "Error",
//       message: error.message
//     })
//   }
// }

const loginHandler = async (req, res, next)=>{
  try{
    // take all inputs
    const {
      usernameOrEmail, password
    } = req.body

    // search account with same email/username
    const admin = await Admin.findOne({
      where:{
        [Op.or]: [
          {
            email: encryptText(usernameOrEmail)
          },
          {
            username: encryptText(usernameOrEmail)
          }
        ]
			}
    });

    // if no account found
    if(!admin){
      const error = new Error("Wrong email or password!");
			error.statusCode = 400;
			throw error;
    }

    // check password
    const checkPassword = await bcrypt.compare(password,admin.password);
    
    // if password invalid
    if(!checkPassword){
      const error = new Error("Wrong email/phone or password!");
			error.statusCode = 400;
			throw error;
    }

    // create token
    const token = jwt.sign({
			userId: admin.id,
			}, key, {
			algorithm: "HS256",
      expiresIn: "2h"
		})

    res.status(200).json({
			status: "Success",
			message: "Login success.",
			token
		})
  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const approveLogin = async (req, res, next)=>{
  try{
    res.status(200).json({
      status: "Success",
      message: "Token is valid.",
    })
  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

module.exports = {loginHandler, approveLogin}
