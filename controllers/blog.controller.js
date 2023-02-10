import cloudinary from "../uploads.js";
import Blog from "../models/Blogs.js";



export const getBlogs =  async(req,res)=>
{
const blogs=await Blog.find()
res.send(blogs)

}



export const postBlog = async (req, res,next) => {
 
    try {
      const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
      });
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio/blogImages',
        public_id: `${blog.title}_image`
      });
      blog.image = result.url;
      await blog.save();
      res.json(blog);
     
    } 
    catch (error) {
      
      res.status(500).json({ error: "Blog doesn't exist !" });
    }
  }
  // export default blogBlog;


export const getBlog= async (req, res) => {

    try{ 

    const blog = await Blog.findOne({ _id: req.params.id })
    if(!blog){
      res.status(404);
      res.send({error:"Blog doesn't exist!"})
    }
    res.send(blog);
    
  
    }

    catch{
        res.status(500).send({error:"Internal Server Error"})
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
      
      res.send(blog)
    }

     catch (err) 
     {
      
      res.status(404);
      res.send({error:"Blog doesn't exist"})
    }
  }


export const deleteBlog = async (req, res) =>{
    try{
        await Blog.deleteOne({ _id:req.params.id})
        res.status(204).send({message:"Blog Deleted"})
    }
    catch{
        res.status(404)
        res.send({error:"Blog doesn't exist"})
    }

}
 

export const getComments= async (req, res) => {

  try{ 
  const blog = await Blog.findOne({ _id: req.params.id }).populate({
    path:'comments.user',
    model:'User',
    select: 'name '
  }).populate({path:'comments.blog',
  model:'Blog',
  select: 'title'});

  res.status(200).send(blog.comments);
  

  }

  catch{
    res.status(404).json({message:"Blog doesn't exist!"});
    
  }
  }




  export const like= async(req,res)=>{
    try {
      
      const blog = await Blog.findById(req.params.id);
     
      //check if the blog is already liked
      const alreadyLiked = blog.likes.find(
        (like) => like.user.toString() === req.user._id.toString(),
      );
      if (alreadyLiked) {
        blog.likes = blog.likes.filter(
          (like) => like.user.toString() !== req.user._id.toString(),
        );
      } else {
        blog.likes.push({
          user: req.user._id,
          blog: req.params.id,
        });
      }
      await blog.save();
      res.status(201).json({
        statusCode: 201,
        success: true,
        data: [{ message: 'Liked', body: blog }],
      });
      
    } 
    catch (error) {
      return res.status(404).send({
        statusCode: 404,
        success: false,
        data: [{ message: 'Blog not found!' }]})
    }

  }

  export const likecounter=async(req,res)=>{
    try{
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).send({
          statusCode: 404,
          success: false,
          data: [{ message: 'Blog not found!' }],
        });}
      else{
          res.status(201).json({
            success:true,
            message:`${blog.likes.length} likes`
          })
        
        }

      }
    
    catch(error){

    }

  }

  
  export const addComment =async (req,res)=>{
    try {
  const blog= await Blog.findOne({ _id: req.params.id })
    
  if(!blog){
    res.status(404);
    res.send({error:"Blog doesn't exist!"})
  }
  else{
    blog.comments=[...blog.comments, {comment:req.body.comment,user:req.user, blog:blog},];
    blog.save();
    res.status(201).json({
      success:true,
      message:`Comment Added`
    })
  
  }
    }
  
  catch (error) {
      res.status(500).json({
        success:false,
        message:`Server Error:Error when adding  a comment ${error.message}`
      })
      
    }}
    