const fs = require('fs');
require('dotenv').config()
const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
 
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();
app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads','images')));
// app.use('/uploads/images',express.static(__dirname + '/uploads/images'));

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;





//new change
app.use(express.static(path.join('public')));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
  next();
});
app.use("/api/places", placesRoutes); //=> /api/places/...
app.use("/api/users", usersRoutes);

//new chnages
app.use((req,res,next)=>{
  res.sendFile(path.resolve(__dirname,'public','index.html'));
});

//new chnage : commented
// app.use((req, res, next) => {
//   const error = new HttpError("could not find this route", 404);
//   throw error;
// });

// error handling middleware function
app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path,(err)=>{
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error ocurred !" });
});
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.asydizo.mongodb.net/${dbName}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("Successfully connected !");
  })
  .catch((e) => {
    console.log(e);
  });
