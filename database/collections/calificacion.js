const mongoose=require('../connect');

const calificacion={
    calif:Number,
    comprador:{
      type:mongoose.Schema.Types.ObjectId,
      reference:'Users'
    },
    cant:Number
};

const calfmodel=mongoose.model('calificacion',calificacion);

module.exports=calfmodel;
