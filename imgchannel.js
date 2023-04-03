const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img: {
        data: Buffer,
        contentType: String,
      }
});


// create model

const users = new mongoose.model("users",userSchema);

module.exports = users;