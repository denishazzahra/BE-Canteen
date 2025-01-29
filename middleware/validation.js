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
    if (error.name === "TokenExpiredError") {
      error.message = "Your session has expired. Please log in again.";
      error.statusCode = 401; // Unauthorized
    } else if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token. Please provide a valid token.";
      error.statusCode = 403; // Forbidden
    } else if (!error.statusCode) {
      error.message = "An unknown error occurred during authentication.";
      error.statusCode = 500; // Internal Server Error
    }
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

module.exports = {validateLogin}