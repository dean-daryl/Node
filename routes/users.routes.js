import {Router} from 'express'
import { getUsers, signIn, signup } from '../controllers/users.controller.js';
import UserSchema from '../validations/user.js';
import isValid from '../middleware/isUserValid.js';
import { deleteUsers} from '../controllers/users.controller.js';
const userrouter= Router();
userrouter.post('/signup',isValid(UserSchema),signup)
userrouter.get('/signup',getUsers)
userrouter.delete('/signup/:id',deleteUsers)
userrouter.post('/signin',signIn)
export default userrouter