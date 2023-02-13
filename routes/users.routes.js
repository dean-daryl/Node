import { Router } from 'express';
import { getUsers, signIn, signup } from '../controllers/users.controller.js';
import UserSchema from '../validations/user.js';
import isUserValid from '../middleware/isUserValid.js';

import passport from 'passport';
import { isAdmin, LoggedIn } from '../middleware/authentication.js';

const userrouter = Router();
userrouter.post('/signup', signup);
userrouter.get('/signup', getUsers);
userrouter.post(
  '/signin',
  passport.authenticate('local-login', { session: false }),
  signIn,
);
export default userrouter;
