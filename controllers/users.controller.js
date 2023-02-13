import User from "../models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const signup= async (req,res)=>{
     const password=req.body.password
     const name=req.body.name
    const hashedPwd=await bcrypt.hash(password, 10)
try{

    const alreadyExits= await User.findOne({name:name})
    if(alreadyExits){
        return res.status(404).json({message:"The Username is taken"})    
    }
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPwd
    })
   
    await user.save();
    res.status(500).json({message:"New User successfully created"})

 
}
catch(error){
console.log(error);
res.status(400).json({message:error.message})
}
}
export const signIn= async(req,res)=>{
    try{ 
     let email=req.body.email;
     let password=req.body.password;
     let user= await User.findOne({email});
  if(!user){
      res.send(404).json({message:"Email isn't valid"})
  }
 
  if(!bcrypt.compareSync(password,user.password)){
      return res.status(401).json({error:"Incorrect Credentials"})
  }
  else{
 const payload={
     id:user.id,
     username:user.name,
     isAdmin:user.is,
     email:user.email
 };
 
 const options={
     expiresIn:'1d'
 };
 const token=jwt.sign(payload,`${process.env.JWT_SECRET}`,options)
 res.status(200).json({ status: 200, success: true, token: token });
  }  
    }
 catch (error) {
   
         console.log("message",error.message)
         return res.status(500).json({message:"Server Error "})
      }
    } 
export const getUsers =  async(req,res)=>
{
const users=await User.find()
res.send(users)
}

// export const deleteUsers= async(req,res)=>{
//     const users= await User.deleteOne({_id:req.params.id})
//     res.json({message:"deleted user"})
    
//     }

