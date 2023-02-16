import express, { json } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import blogrouter from './routes/blogs.routes.js';
import queryrouter from './routes/queries.routes.js';
import userrouter from './routes/users.routes.js';
import passport from 'passport';
import * as config_file from './config/passport.js';
import dotenv from 'dotenv';
import swaggerDocs from './docs/swagger.js';
dotenv.config();
export const PORT = process.env.PORT || 3000;
export const app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(json());
app.use(
  session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
config_file.signIn(passport);
app.use('/api', blogrouter);
app.use('/api', queryrouter);
app.use('/api', userrouter);

if (process.env.NODE_ENV !== 'test') {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('DB Connected');
    })
    .catch((error) => {
      console.log(error);
    });
}

app.listen(PORT, () => {
  console.log('Server is On');
  swaggerDocs(app, PORT);
});
