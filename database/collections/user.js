 const mongoose = require("../connect");


 const usersSchema = Schema({
     name: {
         firstName: String,
         lastName: String,
         required: [true, 'Debe ingresar un nombre y apellidos']
     },
     email: {
         type: String,
         required: 'Falta el Email',
         match: /^(([^<>()\[\]\.,;:\s @\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
     },
     password: String,

     register_day: {
         type: Date,
         default: Date.now()
     },
     userType: String
 });
 const users = mongoose.model('Users', usersSchema);
 module.exports = users;