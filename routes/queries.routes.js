import express from 'express'
import { getQueries,postQuery } from '../controllers/queries.controller.js'
import isValid from '../middleware/isBlogValid.js';
import QuerySchema from '../validations/query.js';
const queryrouter=express.Router()


queryrouter.get("/queries",getQueries)

queryrouter.post("/queries",isValid(QuerySchema), postQuery);

export default queryrouter;