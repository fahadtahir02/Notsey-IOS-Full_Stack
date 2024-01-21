const express = require("express")
const mongoose = require('mongoose')

var app = express()
var data = require("./noteSchema")

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", function(){
    console.log("connected to database")
}).on("error", function(error){
    console.log("failed to connect" + error)
})

//Creating ROUTES 

//Create Note -> Sending note to sever = POST

//Delete Note -> Sending delete request = POST

//Update Note -> Sending update = POST

//Fetch all notes -> Retrieval = GET

