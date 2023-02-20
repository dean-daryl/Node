import multer, { diskStorage } from "multer";
import { Router } from 'express';
import cloudinary from "cloudinary";
import { getBlogs, postBlog, getBlog, updateBlog, deleteBlog, addComment, getComments, like, likecounter } from '../controllers/blog.controller.js';
import isValid from "../middleware/isBlogValid.js";
import BlogSchema from "../validations/blog.js";
import { isAdmin, LoggedIn } from "../middleware/authentication.js";
import commentSchema from "../validations/comments.js";

const blogrouter=Router();
const storage=diskStorage({});
export const fileFilter=(req,file,cb)=>{
if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Invalid image file', false);
  }}


const uploads= multer({storage,fileFilter})
   
   
    
   blogrouter.get("/blogs", getBlogs)
   blogrouter.post("/blogs",LoggedIn,isAdmin, uploads.single('image'),isValid(BlogSchema), postBlog); 
   blogrouter.get("/blogs/:id",getBlog);
   blogrouter.patch("/blogs/:id",LoggedIn,uploads.single('image'),updateBlog)
   blogrouter.delete("/blogs/:id",LoggedIn,isAdmin,deleteBlog);
   blogrouter.post("/blogs/:id/comments",isValid(commentSchema),addComment)
   blogrouter.get("/blogs/:id/comments",getComments)
   blogrouter.post("/blogs/:id/likes",like)
   blogrouter.get("/blogs/:id/likes",likecounter)
    export default  blogrouter;
