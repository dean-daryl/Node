import express,{json} from "express";
import session from "express-session";
import {connect} from "mongoose"
import mongoose from "mongoose";	
import blogrouter from './routes/blogs.routes.js';
import queryrouter from "./routes/queries.routes.js";
import userrouter from "./routes/users.routes.js";

import passport from "passport";
import * as config_file from "./config/passport.js";



export const app=express() 
	mongoose.connect(
		"mongodb://localhost:27017/acmedb",
		{ useNewUrlParser: true, useUnifiedTopology: true },
		(error) => {
			
		  if (!error) {
			console.log("-->Connected to mongoDB");
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
			// app.listen(5000, () => {
			//   console.log("-->All stations, be advised the server is up and running!");
			// });
		  }
		});
