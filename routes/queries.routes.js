import express from 'express'
import { getQueries,postQuery } from '../controllers/queries.controller.js'
const queryrouter=express.Router()


queryrouter.get("/queries",getQueries)

queryrouter.post("/queries", postQuery);

export default queryrouter;