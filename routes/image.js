const express = require('express');
const Imagen = require('../database/collections/image');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        try {
            fs.statSync('./public/uploads');
        } catch (e) {
            fs.mkdirSync('./public/uploads/');
        }
        cb(null, './public/uploads/');
    },
    filename: (res, file, cb) =>{
        cb(null, 'IMG-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
  storage:storage
});


router.get('/',(req,res) =>{
    Imagen.find().exec((err,result) =>{
        res.status(200).json(result);
    });
});

router.post('/',upload.single('img'),async(req,res) =>{
    console.log(req.file);

    var datos ={
      url:req.file['filename']
    }
    var d = new Imagen(datos);
    var result = await d.save();
    res.status(200).json({
      message:result
    });
});


module.exports = router;
