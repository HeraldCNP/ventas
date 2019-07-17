const mongoose=require('../connect');

const cita={
  fecha:Date
};

const citamodel=mongoose.model('cita',cita);

module.exports=citamodel;
