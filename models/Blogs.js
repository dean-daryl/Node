import mongoose from 'mongoose';
import { commentSchema } from './comments.js';
import { likeSchema } from './like.js';
  
const schema = mongoose.Schema({
	
	title: String,
	content: String,
	comments:[commentSchema],
	likes:[likeSchema],
	image:String
	
});



export default mongoose.model("Blog", schema);


