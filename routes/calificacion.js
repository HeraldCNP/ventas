const Calificacion=require('../database/collections/calificacion');

const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    Calificacion.find().exec().then(docs=>{
      if(docs.length>0){
        res.json(docs);
      }else{
        res.json({
          message:'no hay'
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
    let calf=req.body.calif;

    Calificacion.find({
      comprador:id
    }).exec((err,doc)=>{
      if(doc.length>0){
        let obj=doc[0];
        obj['calif']+=calif;
        obj['cant']=+1;
        Calificacion.findByIdAndUpdate(obj['_id'],obj).exec(()=>{
          res.json({
            message:'actualizado'
          });
        });
      }
    });
});

module.exports=router;
