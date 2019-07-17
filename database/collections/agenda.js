const mongoose=require('../connect');

const agenda={
    fecha:Date
};

const agendamodel=mongoose.model('agenda',agenda);

module.exports=agendamodel;
