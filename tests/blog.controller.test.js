import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/Users.js';
import { app } from '../index.js';
import {
  getBlogs,
  getBlog,
  postBlog,
  deleteBlog,
  getComments,
  addComment,
  like,
  likecounter,
  updateBlog,
} from '../controllers/blog.controller.js';
import Blog from '../models/Blogs';
import Query from '../models/queries.js';
import { fileFilter } from '../routes/blogs.routes.js';
import isValid from '../middleware/isBlogValid.js';
import isUserValid from '../middleware/isUserValid.js';
import { isAdmin, LoggedIn } from '../middleware/authentication.js';
import { PORT } from '../index.js';
import { getQueries, postQuery } from '../controllers/queries.controller.js';
import { signIn, signup } from '../controllers/users.controller.js';
import { response } from 'express';
jest.setTimeout(200000);
jest.mock('../models/Blogs.js', () => ({
  find: jest.fn().mockResolvedValue([
    { id: 1, title: 'Blog 1' },
    { id: 2, title: 'Blog 2' },
  ]),
  findOne: jest.fn(),
  deleteOne: jest.fn(),
}));
const mockUser = {
  username: 'testuser',
  password: 'testpassword',
  isAdmin: true,
};
const mockBlogData = {
  title: 'Test Blog',
  content: 'Lorem ipsum dolor sit amet',
  image: 'https://example.com/image.jpg',
};

let server;
beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  server.close(done);
});

describe('myApi', () => {
  beforeEach(async () => {
    mongoose.set('strictQuery', true);
    console.log(`${process.env.MONGO_URI_TEST}`);
    await mongoose
      .connect(`${process.env.MONGO_URI_TEST}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('database is connected');
      })
      .catch((err) => console.log(err.message));
  });

  // Get All Blogs Test

  describe('getBlogs', () => {
    let req, res, next;

    beforeEach(() => {
      req = {};
      res = {
        send: jest.fn(),
      };
      next = jest.fn();
    });

    it('retrieves and returns all blogs', async () => {
      await getBlogs(req, res, next);

      expect(Blog.find).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith([
        { id: 1, title: 'Blog 1' },
        { id: 2, title: 'Blog 2' },
      ]);
    });
  });



  // delete Blog
  describe('deleteBlog', () => {
    let req, res;
    beforeEach(() => {
      (req = {
        params: {
          id: '123',
        },
      }),
        (res = {
          status: jest.fn().mockReturnValue({ send: jest.fn() }),
          send: jest.fn(),
        });
    });

    it('should delete a blog and return a 204 status code', async () => {
      const blog = {
        _id: '123',
        title: 'My Blog',
        content: 'This is my blog content',
      };

      Blog.deleteOne.mockResolvedValue(blog);
      await deleteBlog(req, res);
      expect(Blog.deleteOne).toHaveBeenCalledWith({ _id: '123' });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.status().send).toHaveBeenCalledWith({
        message: 'Blog Deleted',
      });
    });

    it('should return a 404 status code if the blog does not exist ', async () => {
      const errorMessage = "Blog doesn't exist";
      Blog.deleteOne.mockRejectedValue(new Error(errorMessage));
      await deleteBlog(req, res);
      expect(Blog.deleteOne).toHaveBeenCalledWith({ _id: '123' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

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
        validate: jest.fn(() => ({ error: null })),
      };
      const req = { body: {} };
      const res = {
        status: jest.fn(() => ({
          send: jest.fn(),
        })),
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
        validate: jest.fn(() => ({ error: null })),
      };
      const req = { body: {} };
      const res = {
        status: jest.fn(() => ({
          send: jest.fn(),
        })),
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
          json: jest.fn(),
        })),
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
          json: jest.fn(() => {}),
        })),
      };
      const next = jest.fn();

      isAdmin(req, res, next);

      expect(next).not.toHaveBeenCalled();
    });
  });

  // Blog ID test

  describe('getBlog', () => {
    let req, res;

    beforeEach(() => {
      req = {
        params: {
          id: '12345',
        },
      };
      res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };
    });
    it('should return the blog when it exists', async () => {
      const blog = {
        _id: '12345',
        title: 'My Blog',
        content: 'This is my blog content',
      };

      Blog.findOne.mockResolvedValue(blog);
      await getBlog(req, res);
      expect(Blog.findOne).toHaveBeenCalledWith({ _id: '12345' });
      expect(res.send).toHaveBeenCalledWith(blog);
    });

    it('should return a 404 error when the blog does not exist', async () => {
      const mockRes = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const findOneStub = jest.spyOn(Blog, 'findOne').mockReturnValue(null);
      await getBlog(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        error: "Blog doesn't exist!",
      });
      expect(findOneStub).toHaveBeenCalledWith({ _id: '12345' });
      findOneStub.mockRestore();
    });

    it('should return a 500 error when there is an internal server error', async () => {
      const mockRes = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const findOneStub = jest.spyOn(Blog, 'findOne').mockImplementation(() => {
        throw new Error('Internal server error');
      });
      await getBlog(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        error: 'Internal Server Error',
      });
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
      });
    });
  });

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
        save: jest.fn(),
      };
      Blog.findOne.mockResolvedValue(blog);
    });

    it('should find the blog by its id', async () => {
      await like(req, res);
      expect(Blog.findOne).toHaveBeenCalledWith({ _id: req.params.id });
    });

    it('should return 500 and the error message on error', async () => {
      const error = new Error('Test error');
      Blog.findOne.mockRejectedValue(error);
      await like(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Server Error:Error when adding  a comment Test error',
      });
    });
  });

  describe('LoggedIn', () => {
    let token;

    beforeAll(async () => {
      const response = await request(app).post('/api/signin').send(mockUser);

      token = response.body.token;
    });
    it('passes control to the next middleware for valid tokens', async () => {
      const user = { email: 'test@example.com' };
      const token = jwt.sign(
        { email: user.email },
        `${process.env.JWT_SECRET}`,
      );
      const req = {
        headers: { authorization: `Bearer ${token}` },
      };
      const res = {
        status: jest.fn(() => ({
          json: jest.fn(),
        })),
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(user);

      await LoggedIn(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: user.email });
      expect(req.user).toEqual(user);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 404 if the user does not exist', async () => {
      const response = await request(app).post('/signin').send(mockBlogData);
      console.log(mockBlogData);
      expect(response.status).toBe(404);
    });
  });

  describe('likecounter', () => {
    // it("return a 401 status if '_id' is invalid", async () => {
    //   const res = await request(app).get('/api/blogs/0001/likes');
    //   expect(res.status).toEqual(401);
    //   const message = res.body.message;
    //   expect(message).toEqual("Blog doesn't exist");
    // });
    it('should return "Blog not found!" if blog is not found', async () => {
      const req = { params: { id: 'invalid_id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await likecounter(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        message: "Blog doesn't exist",
      });
    });
  });
});

describe('POST /query', () => {
  // define a mock query object for testing
  const mockQuery = {
    name: 'John Doe',
    message: 'Test message',
  };

  // it('should save a new query to the database and return it in the response', async () => {

  //   const response = await request(app)
  //     .post('/api/queries')
  //     .send(mockQuery);

  //   expect(response.status).toBe(200);

  //   expect(response.body).toMatchObject({
  //     _id: expect.any(String),
  //     name: mockQuery.name,
  //     message: mockQuery.message,
  //   });

  //   const savedQuery = await Query.findById(response.body._id);

  //   expect(savedQuery).toBeDefined();
  //   expect(savedQuery.toObject()).toMatchObject(mockQuery);
  // });
});

describe('GET /queries', () => {
  const mockQuery = {
    name: 'John Doe',
    message: 'Test message',
  };

  beforeEach(async () => {
    await new Query(mockQuery).save();
  });

  it('should return a list of queries from the database', async () => {
    const response = await request(app).get('/api/queries');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toMatchObject({
      _id: expect.any(String),
      name: mockQuery.name,
      message: mockQuery.message,
    });
  });
});

describe('POST /signup', () => {
  // define a mock user object for testing
  const mockUser = {
    name: 'testuser1',
    email: 'testuser@example.com',
    password: 'password123',
  };

  // it('should create a new user', async () => {
  //   const response = await request(app)
  //     .post('/api/signup')
  //     .send(mockUser);
  //     expect(response.status).toBe(200);

  //   expect(response.body.message).toBe('New User successfully created');

  //   // expect a new user to have been added to the database
  //   const users = await User.find({});
  //   expect(users).toHaveLength(1);
  //   expect(users[0]).toMatchObject({
  //     name: mockUser.name,
  //     email: mockUser.email,
  //     password: expect.any(String),
  //   });

  //   // expect the password to be hashed using bcrypt
  //   const isPasswordValid = await bcrypt.compare(mockUser.password, users[0].password);
  //   expect(isPasswordValid).toBe(true);
  // });

  it('should return an error if the username is already taken', async () => {
    await new User({
      name: mockUser.name,
      email: 'anotheruser@example.com',
      password: 'password123',
    }).save();

    const response = await request(app).post('/api/signup').send(mockUser);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('The Username is taken');
    const users = await User.find({});
  });

  // add more test cases as needed
});
