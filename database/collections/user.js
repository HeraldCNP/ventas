 const mongoose = require("../connect");


 const usersSchema = new mongoose.Schema({
     nombre: String,
     email: String,
     password: String,
     fono: String,
     // comprador:{
     //   type:mongoose.Schema.Types.ObjectId,
     //   ref:'comprador'
     // },
     // vendedor:{
     //   type:mongoose.Schema.Types.ObjectId,
     //   ref:'vendedor'
     // }
 });

 const users = mongoose.model('Users', usersSchema); //modelo
 module.exports = users;