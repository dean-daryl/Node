import mongoose from "mongoose"

const schema=mongoose.Schema({

name:String,
email:String,
message:String
})
 

export default mongoose.model("Query",schema)