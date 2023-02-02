import multer, { diskStorage } from "multer";
import { Router } from 'express';
const blogrouter=Router();
import { v2 as cloudinary } from "cloudinary";
import { getBlogs, postBlog, getBlog, updateBlog, deleteBlog } from '../controllers/blog.controller.js';
import isValid from "../middleware/isBlogValid.js";
import BlogSchema from "../validations/blog.js";


const storage=diskStorage({});
const fileFilter=(req,file,cb)=>{
if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Invalid image file', false);
  }};


const uploads= multer({storage,fileFilter})
   
    cloudinary.config({
        cloud_name:'degfjcic5',
        api_key:'885817653263579',
        api_secret:'IGH_YJIwDxv_R4hk9KajoMoiI5I'
    
    })
    
   blogrouter.get("/blogs", getBlogs)
   blogrouter.post("/blogs",isValid(BlogSchema), uploads.single('image'), postBlog); 
   blogrouter.get("/blogs/:id",getBlog);
   blogrouter.patch("/blogs/:id",uploads.single('image'),updateBlog)
   blogrouter.delete("/blogs/:id",deleteBlog);


    export default  blogrouter;
