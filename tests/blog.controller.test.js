import cloudinary from '../uploads.js';
import request from 'supertest';
import { app } from '../index.js';
import { getBlogs,getBlog,postBlog, deleteBlog,getComments,addComment,like,likecounter} from '../controllers/blog.controller.js';
import Blog from '../models/Blogs';


jest.mock('../models/Blogs.js', () => ({
  find: jest.fn().mockResolvedValue([{ id: 1, title: 'Blog 1' }, { id: 2, title: 'Blog 2' }]),
  findOne: jest.fn(),
  deleteOne:jest.fn(),
  save:jest.fn()
 

  
  
}));

// Get All Blogs Test

describe('getBlogs', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn()
    };
    next = jest.fn();
  });


  it('retrieves and returns all blogs', async () => {
    await getBlogs(req, res, next);

    expect(Blog.find).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith([{ id: 1, title: 'Blog 1' }, { id: 2, title: 'Blog 2' }]);
  });
});


// Post Blog
// jest.mock('cloudinary', () => ({
//   uploader: {
//     upload: jest.fn()
//   }
 
// }));


describe('postBlog', () => {
  it('return a 401 status if user is not logged in', async () => {
    const res = await request(app).post('/api/blogs/').send({});
    expect(res.status).toEqual(401);
  });
  it('return a 201 status if user is admin', async () => {
    const user = {
      email: 'email@gmail.com',
      password: 'password',
    };
    const blog = {
      title: 'blog title',
      content: 'blog content',
    };
    const login = await request(app).post('/api/login').send(user);
    const token = login.body.token;
    const createdBlog = await request(app)
      .post('/api/blogs/')
      .send(blog)
      .set('Authorization', 'Bearer ' + token);
    expect(createdBlog.status).toEqual(201);
    expect(createdBlog.body.data).toHaveProperty(
      'title',
      'content',
      'likes',
      'comments',
      '_id',
    );
  });
});

// update Blog

describe('updateBlog', () => {
  it('return a 401 status if user is not logged in', async () => {
    const res = await request(app).post('/api/blogs/').send({});
    expect(res.status).toEqual(401);
  });
  it('return a 201 status if user is admin', async () => {
    const user = {
      email: 'email@gmail.com',
      password: 'password',
    };
    const blog = {
      title: 'blog title',
      content: 'blog content',
    };
    const signin = await request(app).post('/api/signin').send(user);
    const token = signin.body.token;
    const Blogs = await request(app).get('/api/blogs');
    const Blog = Blogs.body.data[0];
    const id = Blog._id;
    const updatedBlog = await request(app)
      .patch(`/api/blogs/${id}`)
      .send(blog)
      .set('Authorization', 'Bearer ' + token);
    expect(updatedBlog.status).toEqual(201);
    expect(updatedBlog.body.data).toHaveProperty(
      'title',
      'content',
      'likes',
      'comments',
      '_id',
    );
  });
});

// delete Blog  
describe('deleteBlog',()=>{
let req, res
beforeEach(()=>{
  req = {
    params: {
      id: '123'
    }},
    res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn()
    };
})

it("should delete a blog and return a 204 status code", async ()=>{

const blog = {
    _id: '123',
    title: 'My Blog',
    content: 'This is my blog content'
    }
    
Blog.deleteOne.mockResolvedValue(blog);
await deleteBlog(req,res)
expect(Blog.deleteOne).toHaveBeenCalledWith({ _id: '123' });
expect(res.status).toHaveBeenCalledWith(204)
expect(res.status().send).toHaveBeenCalledWith({ message: "Blog Deleted" });

})


it("should return a 404 status code if the blog does not exist ", async()=>{
const errorMessage="Blog doesn't exist"
Blog.deleteOne.mockRejectedValue(new Error(errorMessage))
await deleteBlog(req,res)
expect(Blog.deleteOne).toHaveBeenCalledWith({_id:'123'})
expect(res.status).toHaveBeenCalledWith(404)
expect(res.send).toHaveBeenCalledWith({ error: errorMessage })
})


})















// Blog ID test





describe('getBlog', () => {
  let req,res;

  beforeEach(() => {
    req = {
      params: {
        id: '12345'
      }
    };
    res={
      send:jest.fn(),
      status:jest.fn().mockReturnValue({json:jest.fn()})
    };
  });
  it('should return the blog when it exists', async () => {
    const blog = {
    _id: '12345',
    title: 'My Blog',
    content: 'This is my blog content'
    };

    Blog.findOne.mockResolvedValue(blog);
    await getBlog(req,res)
    expect(Blog.findOne).toHaveBeenCalledWith({ _id: '12345' });
    expect(res.send).toHaveBeenCalledWith(blog);
    });



  it('should return a 404 error when the blog does not exist', async () => {
    const mockRes = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    const findOneStub = jest.spyOn(Blog, 'findOne').mockReturnValue(null);
    await getBlog(req, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith({ error: "Blog doesn't exist!" });
    expect(findOneStub).toHaveBeenCalledWith({ _id: '12345' });
    findOneStub.mockRestore();
  });

  it('should return a 500 error when there is an internal server error', async () => {
    const mockRes = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    const findOneStub = jest.spyOn(Blog, 'findOne').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    await getBlog(req, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ error: "Internal Server Error" });
    findOneStub.mockRestore();
  });
});



// Get Comments


// describe('getComments', () => {
//   it('should return the comments for a specific blog', async () => {
//     const res = await request(app).get('/blogs/:id/comments');
//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it('should return 404 error if blog does not exist', async () => {
//     const res = await request(app).get('/blogs/nonexistent/comments');
//     expect(res.statusCode).toBe(404);
//     expect(res.body).toHaveProperty('error', "Blog doesn't exist!");
//   });

//   it('should return 500 error if there is a server error', async () => {
//     const res = await request(app).get('/blogs/server-error/comments');
//     expect(res.statusCode).toBe(500);
//     expect(res.body).toHaveProperty('error', 'Internal Server Error');
//   });
// });


// getcomments

// describe('getcomments', () => {
//   it("return a 400 status if '_id' is invalid", async () => {
//     const res = await request(app).get('/api/blogs/1/comments');
//     expect(res.status).toEqual(400);
//     const message = res.body.message;
//     expect(message).toEqual("Blog doesn't exist");
//   });
//   it('return one blog', async () => {
//     const allBlogs = await request(app).get('/api/blogs');
//     const currentBlog = allBlogs.body.data[0];
//     const id = currentBlog._id;
//     const res = await request(app).get(`/api/blogs/${id}/comments`);
//     expect(res.status).toEqual(200);
//   });
// });

// add comments

describe('addComment', () => {
  let req;
  let res;
  let blog;

  beforeEach(() => {
    req = {
      params: { id: '123' },
      body: { comment: 'test comment' },
      user: 'test user',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    blog = {
      comments: [],
      save: jest.fn(),
    };
    Blog.findOne.mockResolvedValue(blog);
  });

  it('should find the blog by its id', async () => {
    await addComment(req, res);
    expect(Blog.findOne).toHaveBeenCalledWith({ _id: req.params.id });
  });

  it('should return 404 if the blog does not exist', async () => {
    Blog.findOne.mockResolvedValue(null);
    await addComment(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ error: "Blog doesn't exist!" });
  });

  it('should add the comment to the blog', async () => {
    await addComment(req, res);
    expect(blog.comments).toHaveLength(1);
    expect(blog.comments[0].comment).toEqual(req.body.comment);
    expect(blog.comments[0].user).toEqual(req.user);
    expect(blog.comments[0].blog).toEqual(blog);
  });

  it('should save the blog', async () => {
    await addComment(req, res);
    expect(blog.save).toHaveBeenCalled();
  });

  it('should return 201 and the success message on success', async () => {
    await addComment(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Comment Added',
    });
  });

  it('should return 500 and the error message on error', async () => {
    const error = new Error('Test error');
    Blog.findOne.mockRejectedValue(error);
    await addComment(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: `Server Error:Error when adding  a comment ${error.message}`,
    })
  })
})

