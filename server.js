require('dotenv').config();
const express = require('express');
const association = require('./util/dbAssoc');
const routes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const multer = require('multer')
const port = process.env.PORT;

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);
app.use((err, req, res, next) => {
  if (err ) {
    console.log(err)
    return res.status(err.statusCode || 500).json({
      status: "Error",
      message: err.message // Return Multer error messages as JSON
    });
  }
  next();
});

app.get("/", (req,res,next)=>{
  console.log("test");
  res.json({
    message: "Hello from another service"
  })
})

association().then(()=>{
  app.listen(port);
  console.log('connected to db')
}).catch(e=>{
  console.log(e);
})