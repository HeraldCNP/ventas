const Agenda=require('../database/collections/agenda');
const Cita=require('../database/collections/cita');

const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{
    Agenda.find().exec().then(docs=>{
      if(docs.length>0){
        res.json(docs);
      }else{
        res.json({
          message:'no hay',
          //date:new Date("5/1/1900, 14:00")
        });
      }
    }).catch(err=>{
      res.status(500).json({
        message:err
      });
    });
});


router.patch('/:id',(req,res)=>{
    let id=req.params.id;
    let d=new Date(req.body.fecha+','+req.body.hora);
    console.log(id);
    Agenda.find({
      vendedor:id
    }).exec(async(err,doc)=>{
      let obj=doc[0];
      let cita=new Cita({
        fecha:d
      });
      let result=await cita.save();
      obj['citas'].push(result['_id']);
      Agenda.findByIdAndUpdate(obj['_id'],obj).exec(()=>{
        res.json({
          message:'cita insertada'
        });
      });
    });

});

module.exports=router;
