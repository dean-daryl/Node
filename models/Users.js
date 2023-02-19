import mongoose from 'mongoose';
  
const schema = mongoose.Schema({
	
	// name: String,
	// isAdmin:{type:Boolean,
	// 		default:false},
	// email: String,
	// password:String

	name: {
		type: String,
		required: true,
	  },
	  email: {
		type: String,
		required: true,
	  },
	  password: {
		type: String,
		required: true,
	  },
	  isAdmin: {
		type: Boolean,
		default: false,
	  }
	
});



export default mongoose.model("User", schema);


