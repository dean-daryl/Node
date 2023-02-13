import jwt from 'jsonwebtoken'
import User from '../models/Users.js'



export const LoggedIn = async(req,res,next)=>{
try{
if (req.headers.authorization) {
const token = req.headers.authorization.split(' ')[1]; 
const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
const user = await User.findOne({ email: decoded.email });


if(!user){
    res.status(404).json({message:"User doesn't Exist"})
}
else{
    req.user = user;
    next();
}

}


}
catch(error){
    console.log(error)
   res.status(403).json({message:"Not Logged In"})
}
}

export const isAdmin = (req, res, next) => {
   
    try {
        
      if (req.user.isAdmin === true) {
        next();
      }
        
      }
     catch (error) {
        console.log(error)
        res.status(403).json({
          status: 403,
          success: false,
          message: `Access denied`
        });
    }
  };
