const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogwebsite' ,{ useNewUrlParser: true, useUnifiedTopology: true } )
.then(()=>{
    console.log("Database connection is successfully");
})
.catch((error)=>{
    console.log(`database error : > ${error}`);
})