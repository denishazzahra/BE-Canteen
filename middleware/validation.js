const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;

const validateLogin = (req, res, next)=>{
  try{
    // take raw string bearer token from headers
    const auth = req.headers.authorization
    let token

    // check if token exist
    if(auth !== undefined && auth.startsWith("Bearer ")){
			token = auth.substring(7); 
		}else{
      const error = new Error("You need to login to access this page.");
			error.statusCode = 403;
			throw error;
    }

    // verify token
    const decoded = jwt.verify(token,key)

    next()

  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

module.exports = {validateLogin}