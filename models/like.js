import mongoose from 'mongoose';
  
const schema = mongoose.Schema({
   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog', 
    }

});




export {schema as likeSchema}