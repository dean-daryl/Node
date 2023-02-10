
const isUserValid = (schema) => (req,res,next) =>{
   
    const{error}=schema.validate(req.body)
    if(error){
      return res.status(400).json({message:"Invalid request body"})}
    else{
        next();
    }
    
    }

export default isUserValid;