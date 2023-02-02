import mongoose from 'mongoose';
  
const schema = mongoose.Schema({
	
	title: String,
	content: String,
	image:String
	
});



export default mongoose.model("Blog", schema);


