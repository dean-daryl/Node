import Query from "../models/queries.js"

export const postQuery=async(req,res)=>{
    // get content and title from HTTP request
    const query=new Query({
    name:req.body.name ,
    email:req.body.email,    
    message:req.body.message
    })
await query.save()
res.send(query)

 }


 export const getQueries=async(req,res)=>
 {
 const queries=await Query.find()

 res.send(queries)

 }

 