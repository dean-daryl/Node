import express,{json} from "express";
import { connect } from "mongoose";
import blogrouter from './routes/blogs.routes.js';
import queryrouter from "./routes/queries.routes.js";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";
cloudinary.config({
	cloud_name:'degfjcic5',
	api_key:'885817653263579',
	api_secret:'IGH_YJIwDxv_R4hk9KajoMoiI5I'

})

connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
	.then(() => {
		const app = express()
        // parse incoming requests and make them accesible through req.body
        app.use(json())
		app.use("/api", blogrouter)   
		app.use("/api", queryrouter)
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})