// import { getBlogs, postBlog, getBlog, updateBlog, deleteBlog } from '../controllers/blog.controller';
// const Joi = require('@hapi/joi');
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import Blog from "../models/Blogs.js";
import bodyParser from "body-parser";


export const getBlogs =  async(req,res)=>
{
const blogs=await Blog.find()
res.send(blogs)

}
// export { getBlogs };

 export const postBlog = async (req, res,next) => {
 
    try {
      const blog = new Blog({
        title: req.body.title,
        content: req.body.content
      });
    //   const doesExist = await Blog.findOne({ title: valid.title });
    //   if (doesExist) {
    //     throw createError.Conflict(`${valid.title} is already been used`);
    //   }
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio/blogImages',
        public_id: `${blog.title}_image`
      });
      blog.image = result.url;
      await blog.save();
      res.send(blog);
      next();
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({ error: "Blog doesn't exist" });
    }
  }
  // export default postBlog;


  export const getBlog= async (req, res) => {

    // retrieving blog from Mongo DB using Mongoose... the findOne method of the Blog model retrieves the blog 
    try{ 

    const blog = await Blog.findOne({ _id: req.params.id })
    res.send(blog);
  
    }

    catch{
        res.status(404);
        res.send({error:"Blog doesn't exist!"})
    }
    }


export const updateBlog =  async (req,res)=>{
    try{
      const blog= await Blog.findOne({ _id: req.params.id })
  
      if(req.body.title){
        blog.title=req.body.title
      }
      if(req.body.content){
        blog.content=req.body.content
      }
      if(req.file){
        blog.image=req.file.path
        const result= await cloudinary.uploader.upload(req.file.path,{
            folder:'portfolio/blogImages',
            public_id:`${blog.title}_image`
        })
        blog.image=result.url;
      }

      await blog.save()
      console.log(blog)
      res.send(blog)
    }

     catch (err) 
     {
      console.log(err)
      res.status(404);
      res.send({error:"Blog doesn't exist"})
    }
  }
  // export default updateBlog;

  export const deleteBlog= async (req, res) =>{
    try{
        await Blog.deleteOne({ _id:req.params.id})
        res.status(204).send()
    }
    catch{
        res.status(404)
        res.send({error:"Blog doesn't exist"})
    }

}
// export default deleteBlog;