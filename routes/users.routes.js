import {Router} from 'express'
import { getUsers, signIn, signup } from '../controllers/users.controller.js';
import UserSchema from '../validations/user.js';
import isValid from '../middleware/isUserValid.js';
import { deleteUsers} from '../controllers/users.controller.js';
import passport from 'passport';
import { isAdmin, LoggedIn } from '../middleware/authentication.js';

const userrouter= Router();
userrouter.post('/signup',isValid(UserSchema),signup)
userrouter.get('/signup',LoggedIn,isAdmin,getUsers)
userrouter.delete('/signup/:id',deleteUsers)
userrouter.post('/signin', passport.authenticate('local-login',  { session: false }),signIn)
export default userrouter