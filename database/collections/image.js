const mongoose = require('../connect');

const image={
  url:String
};

const imagemodel=mongoose.model('Image',image);

module.exports=imagemodel;
