const dotenv=require("dotenv");
const express = require("express");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name:'degfjcic5',
	api_key:'885817653263579',
	api_secret:'IGH_YJIwDxv_R4hk9KajoMoiI5I'

})


export default cloudinary;