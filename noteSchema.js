var mongoose = require("mongoose")
var Schema = mongoose.Schema

var note = new Schema({
    title : String,
    date : String,
    note : String
})

//Transfering our schema


//Data is an object that holds our 'note' schema
const Data = mongoose.model("data", note)

//This schema is only available in this file we want it to be accessable in server.js file
module.exports = Data