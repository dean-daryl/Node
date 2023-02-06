
const isValid = (schema) => (req,res,next) =>{
    // const {title}=req.body
   
    // console.log("++++++++",req.body)
    const{error}=schema.validate(req.body)
    if(error){
        console.log(error)
      return res.status(400).send({message: error.details[0].message})}
    else{
        next();
    }
    
    }

export default isValid;