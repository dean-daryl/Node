const isValid = (schema) => (req,res,next) =>{
    const{error}=schema.validate(req.body)
  
    if(error){
        console.log(error)
      return res.status(400).json({message: error.details[0].message})}
    else{
        return res.json("successfully uploaded")
    }
    
    }

export default isValid;