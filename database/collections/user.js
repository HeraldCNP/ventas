 const mongoose = require("../connect");


 const usersSchema = new mongoose.Schema({
     name: String,
     email: String,
     password: String,
     fono: String,
     sex: String,
     registerDate: Date
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
 module.exports = { model: users, schema: usersSchema };