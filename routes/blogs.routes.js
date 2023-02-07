import multer, { diskStorage } from "multer";
import { Router } from 'express';
const blogrouter=Router();
import { v2 as cloudinary } from "cloudinary";
import { getBlogs, postBlog, getBlog, updateBlog, deleteBlog, addComment, getComments, like, likecounter } from '../controllers/blog.controller.js';
import isValid from "../middleware/isBlogValid.js";
import BlogSchema from "../validations/blog.js";
import { isAdmin, LoggedIn } from "../middleware/authentication.js";
import commentSchema from "../validations/comments.js";


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
   blogrouter.post("/blogs",LoggedIn,isAdmin, uploads.single('image'),isValid(BlogSchema), postBlog); 
   blogrouter.get("/blogs/:id",getBlog);
   blogrouter.patch("/blogs/:id",LoggedIn,isAdmin,uploads.single('image'),updateBlog)
   blogrouter.delete("/blogs/:id",LoggedIn,isAdmin,deleteBlog);
   blogrouter.post("/blogs/:id/comments",LoggedIn,isValid(commentSchema),addComment)
   blogrouter.get("/blogs/:id/comments",getComments)
   blogrouter.post("/blogs/:id/likes",LoggedIn,like)
   blogrouter.get("/blogs/:id/likes",LoggedIn,likecounter)
    export default  blogrouter;
