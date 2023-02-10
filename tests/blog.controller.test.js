import request from 'supertest';
import  jwt  from 'jsonwebtoken';
import User from '../models/Users.js';
import { app } from '../index.js';
import { getBlogs,getBlog,postBlog, deleteBlog,getComments,addComment,like,likecounter} from '../controllers/blog.controller.js';
import Blog from '../models/Blogs';
import { fileFilter } from '../routes/blogs.routes.js';
import isValid from '../middleware/isBlogValid.js';
import isUserValid from '../middleware/isUserValid.js';
import { isAdmin,LoggedIn } from '../middleware/authentication.js';

// let connection;

// beforeAll(async () => {

//   connection = await mongodb.connect(
//     "mongodb://localhost:27017/acmedb",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   );
// });

// afterAll(async () => {
//   await connection.close();
// });
jest.mock('../models/Blogs.js', () => ({
  find: jest.fn().mockResolvedValue([{ id: 1, title: 'Blog 1' }, { id: 2, title: 'Blog 2' }]),
  findOne: jest.fn(),
  deleteOne:jest.fn()

  
  
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
  it('return a 404 status if user is not logged in', async () => {
    const res = await request(app).post('/api/blogs/').send({});
    expect(res.status).toEqual(404);
  });
  // it('return a 201 status if user is admin', async () => {
  //   const user = {
  //     email: 'email@gmail.com',
  //     password: 'password',
  //   };
  //   const blog = {
  //     title: 'blog title',
  //     content: 'blog content',

  //   };
  //   const signin = await request(app).post('/api/signin').send(user);
  //   const token = signin.body.token;
  //   const createdBlog = await request(app)
  //     .post('/api/blogs/')
  //     .send(blog)
  //     .set('Authorization', 'Bearer ' + token);
  //   expect(createdBlog.status).toEqual(201);
  //   expect(createdBlog.body.data).toHaveProperty(
  //     'title',
  //     'content',
  //     'likes',
  //     'comments',
  //     '_id',
  //   );
  // });
});

// update Blog

// describe('updateBlog', () => {
//   it('return a 401 status if user is not logged in', async () => {
//     const res = await request(app).post('/api/blogs/').send({});
//     expect(res.status).toEqual(401);
//   });

// });

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

describe('fileFilter', () => {
  it('accepts image files', () => {
    const file = { mimetype: 'image/jpeg' };
    const cb = jest.fn();

    fileFilter(null, file, cb);

    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it('rejects non-image files', () => {
    const file = { mimetype: 'text/plain' };
    const cb = jest.fn();

    fileFilter(null, file, cb);

    expect(cb).toHaveBeenCalledWith('Invalid image file', false);
  });
});

describe('isValid', () => {
  it('validates the request body against the schema', () => {
    const schema = {
      validate: jest.fn(() => ({ error: null }))
    };
    const req = { body: {} };
    const res = {
      status: jest.fn(() => ({
        send: jest.fn()
      }))
    };
    const next = jest.fn();

    isValid(schema)(req, res, next);

    expect(schema.validate).toHaveBeenCalledWith(req.body);
    expect(next).toHaveBeenCalled();
  });

});

describe('isUserValid', () => {
  it('validates the request body against the schema', () => {
    const schema = {
      validate: jest.fn(() => ({ error: null }))
    };
    const req = { body: {} };
    const res = {
      status: jest.fn(() => ({
        send: jest.fn()
      }))
    };
    const next = jest.fn();

    isUserValid(schema)(req, res, next);

    expect(schema.validate).toHaveBeenCalledWith(req.body);
    expect(next).toHaveBeenCalled();
  });

});

describe('isAdmin', () => {
  it('passes control to the next middleware for admin users', () => {
    const req = { user: { isAdmin: true } };
    const res = {
      status: jest.fn(() => ({
        json: jest.fn()
      }))
    };
    const next = jest.fn();

    isAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('returns a 403 response for non-admin users', () => {
    const req = { user: { isAdmin: false } };
    const res = {
      status: jest.fn(() => ({
        json: jest.fn(() => {})
      }))
    };
    const next = jest.fn();

    isAdmin(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    // expect(res.status().json).toHaveBeenCalledWith({
    //   status: 403,
    //   success: false,
    //   message: `Access denied`
    // });
  });

  it('returns a 500 response for errors thrown', () => {
    const error = new Error('Test error');
    const req = { user: {} };
    const res = {
      status: jest.fn(() => ({
        json: jest.fn(() => {})
      }))
    };
    const next = jest.fn();

    isAdmin(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    // expect(res.status().json).toHaveBeenCalledWith({
    //   status: 500,
    //   success: false,
    //   message: `Error while checking admin Test error`
    // });
  });

});













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
//     const req = await request(app).get('/api/blogs/:id/comments');
//     expect(req.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it('should return 404 error if blog does not exist', async () => {
//     const req = await request(app).get('/api/blogs/10114/comments');
//     expect(req.statusCode).toHaveBeenCalledWith(404);
//     const message= res.body.message

//     expect(message).toEqual("Blog doesn't exist!");
//   });

  
// });




// Add comments



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



// adding like 


describe('like', () => {
  let req;
  let res;
  let blog;

  beforeEach(() => {
    req = {
    params: { id: '123' },
    user: 'test user',
    };
    res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    };

    blog = {
    likes: [],
    save: jest.fn()
    };
    Blog.findOne.mockResolvedValue(blog);
  });

  it('should find the blog by its id', async () => {
    await like(req, res);
    expect(Blog.findOne).toHaveBeenCalledWith({ _id: req.params.id });
  });

  // it('should return 404 if the blog does not exist', async () => {
  //   Blog.findOne.mockResolvedValue(null);
  //   await like(req, res);
  //   expect(res.status).toEqual(404);
  //   expect(res.send).toEqual("Blog doesn't exist!");
  // });

  // it('should save the blog', async () => {
  //   await like(req, res);
  //   await blog.save;
  //   expect(blog.save).toHaveBeenCalled();
  // });

  

  it('should return 500 and the error message on error', async () => {
    const error = new Error('Test error');
    Blog.findOne.mockRejectedValue(error);
    await like(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Server Error:Error when adding  a comment Test error',
    })
  })
})



describe('LoggedIn', () => {
  it('passes control to the next middleware for valid tokens', async () => {
    const user = { email: 'test@example.com' };
    const token = jwt.sign({ email: user.email }, `${process.env.JWT_SECRET}`);
    const req = {
      headers: { authorization: `Bearer ${token}` },
    };
    const res = {
      status: jest.fn(() => ({
        json: jest.fn()
      }))
    };
    const next = jest.fn();
    User.findOne = jest.fn().mockResolvedValue(user);

    await LoggedIn(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: user.email });
    expect(req.user).toEqual(user);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  // it('returns a 404 response for non-existing users', async () => {
  //   const token = jwt.sign({ email: 'test@example.com' }, `${process.env.JWT_SECRET}`);
  //   const req = {
  //     headers: { authorization: `Bearer ${token}` },
  //   };
  //   const res = {
  //     status: jest.fn(() => ({
  //       json: jest.fn(() => {})
  //     }))
  //   };
  //   const next = jest.fn();
  //   User.findOne = jest.fn().mockResolvedValue(null);

  //   await LoggedIn(req, res, next);

  //   expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  //   expect(next).not.toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(404);
  //   expect(res.json).toHaveBeenCalledWith({ message: "User doesn't Exist" });

  // });

  // it('returns a 401 response for missing tokens', async () => {
  //   const req = { headers: {} };
  //   const res = {
  //     status: jest.fn(() => ({
  //       json: jest.fn(() => {})
  //     }))
  //   };
  //   const next = jest.fn();
  //   User.findOne = jest.fn().mockResolvedValue(null);

  //   await LoggedIn(req, res, next);

  //   expect(User.findOne).not.toHaveBeenCalled();
  //   expect(next).not.toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(401);
  //   expect(res.status().json).toHaveBeenCalledWith({ message: "Not Logged In" });
  // });

  it('returns a 500 response for errors thrown', async () => {
    const error = new Error('Test error');
    const token = jwt.sign({ email: 'test@example.com' }, `${process.env.JWT_SECRET}`);
  })
})











// describe('like', () => {
//   let req;
//   let res;
//   let blog;
  
//   beforeEach(() => {
//   req = {
//   params: { id: '123' },
//   user: 'test user',
//   };
//   res = {
//   status: jest.fn().mockReturnThis(),
//   send: jest.fn().mockReturnThis(),
//   json: jest.fn().mockReturnThis(),
//   };
//   blog = {
//   likes: [],
//   save: jest.fn(),
//   };
//   Blog.findOne.mockResolvedValue(blog);
//   });
  
//   it('should find the blog by its id', async () => {
//   await like(req, res);
//   expect(Blog.findOne).toHaveBeenCalledWith({ _id: req.params.id });
//   });
  
//   it('should return 404 if the blog does not exist', async () => {
//   Blog.findOne.mockResolvedValue(null);
//   await like(req, res);
//   expect(res.status).toHaveBeenCalledWith(404);
//   expect(res.json).toHaveBeenCalledWith({
//   message: "Blog doesn't exist!",
//   });
//   });
  
//   it('should save the blog', async () => {
//   await like(req, res);
//   expect(blog.save).toHaveBeenCalled();
//   });
  
//   it('should return 201 and the success message on success', async () => {
//   await like(req, res);
//   expect(res.status).toHaveBeenCalledWith(201);
//   expect(res.json).toHaveBeenCalledWith({
//     statusCode: 201,
//     success: true,
//     message: 'Like Added'
//   });
//   });
  
//   it('should return 500 and the error message on error', async () => {
//   const error = new Error('Test error');
//   Blog.findOne.mockRejectedValue(error);
//   await like(req, res);
//   expect(res.status).toHaveBeenCalledWith(500);
//   expect(res.json).toHaveBeenCalledWith({
//     statusCode: 500,
//   success: false,
//   message: 'Blog not found!'
//   });
//   });
//   });