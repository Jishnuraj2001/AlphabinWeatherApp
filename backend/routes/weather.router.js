const express=require("express");
const fetch=require("isomorphic-fetch");
require("dotenv").config();
const weatherRouter=express.Router();

weatherRouter.get("/current",async(req,res)=>{
    const city=req.query.city;
    try {
        const ress=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.apikey}`);
        const data=await ress.json();
        res.status(200).json({"msg":"got current weather successfully","data":data});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"somthing went wrong while fetching current weather"});
    }
})

weatherRouter.get("/forecast",async(req,res)=>{
    const city=req.query.city;
    try {
        const ress=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.apikey}`);
        const data=await ress.json();
        res.status(200).json({"msg":"got forecast weather successfully","data":data});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"somthing went wrong while fetching forecast weather"});
    }
})

module.exports={
    weatherRouter
}
