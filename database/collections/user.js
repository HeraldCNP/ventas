 const mongoose = require("../connect");


 const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },

     email: {
         type: String,
         required: true
     },
     password: String,
     phone: Number,
     address: String,
     register_day: {
         type: Date,
         default: Date.now()
     },
     userType: String
 });

 const users = mongoose.model('Users', usersSchema); //modelo
 module.exports = users;