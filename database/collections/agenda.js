const mongoose=require('../connect');

const agenda={
    citas:[
      mongoose.Schema.Types.ObjectId
    ],
    vendedor:{
      type:mongoose.Schema.Types.ObjectId,
      reference:'Users'
    },
};

const agendamodel=mongoose.model('agenda',agenda);

module.exports=agendamodel;
