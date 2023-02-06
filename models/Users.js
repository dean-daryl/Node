import mongoose from 'mongoose';
  
const schema = mongoose.Schema({
	
	name: String,
	email: String,
	password:String
	
});



export default mongoose.model("User", schema);


