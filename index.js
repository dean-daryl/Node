import express,{json} from "express";
import session from "express-session";
import { connect } from "mongoose";
import blogrouter from './routes/blogs.routes.js';
import queryrouter from "./routes/queries.routes.js";
import userrouter from "./routes/users.routes.js";
import { v2 as cloudinary } from "cloudinary";
import passport from "passport";
import * as config_file from "./config/passport.js";

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
		app.use(
			session({
			  secret: 'my secret key',
			  resave: false,
			  saveUninitialized: true,
			  cookie: { secure: true },
			})
		  );
		app.use(passport.initialize());
		app.use(passport.session());
		config_file.signIn(passport);
		app.use("/api", blogrouter)   
		app.use("/api", queryrouter)
		app.use("/api", userrouter)
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})