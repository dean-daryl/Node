import express from 'express'
import { getQueries,postQuery } from '../controllers/queries.controller.js'
import { isAdmin, LoggedIn } from '../middleware/authentication.js';
import isValid from '../middleware/isBlogValid.js';
import QuerySchema from '../validations/query.js';
const queryrouter=express.Router()


queryrouter.get("/queries",LoggedIn,isAdmin,getQueries)

queryrouter.post("/queries",LoggedIn,isValid(QuerySchema) , postQuery);

export default queryrouter;