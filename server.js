const express = require("express")
const mongoose = require('mongoose')

var app = express()
var Data = require("./noteSchema")

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", function(){
    console.log("connected to database")
}).on("error", function(error){
    console.log("failed to connect" + error)
})

//Creating ROUTES 

//Create Note -> Sending note to sever = POST
//req = notes +(all its data) being sent to this db
//res = db response back to our app.
app.post('/create', (req, res) => {
    var note = new Data ({
        note : req.get("note"),
        title : req.get("title"),
        date : req.get("date")
    })
    note.save().then(() => {
        if (note.isNew == false){
            console.log("Saved Data")
            res.send("Saved Data!")
        }else{
            console.log("Failed to save data")
        }

    })
})
//Fetch all notes -> Retrieval = GET
app.get('/fetch', (req, res) => {
    //.find({the empty brackets mean find everything in database}).then returns every object. 
    Data.find({}).then((DBitems)=>{
        //send us app users a response of all the retrieved items.
        res.send(DBitems)
    })
})


//Delete Note -> Sending delete request = POST
app.post("/delete", async (req, res) => {
    try {
        await Data.findOneAndDelete({ _id: req.get('id') });
        res.send("Deleted successfully");
    } catch (err) {
        console.log("Error deleting note: " + err);
        res.status(500).send("Error deleting note");
    }
});

//Update Note -> Sending update = POST

app.post('/update', async (req, res) => {
    try {
        await Data.findOneAndUpdate(
            { _id: req.get('id') },
            {
                note: req.get("note"),
                title: req.get("title"),
                date: req.get("date")
            }
        );
        res.send("Updated successfully!");
    } catch (err) {
        console.log('Error updating note: ' + err);
        res.status(500).send("Error updating note");
    }
});



//'http://192.168.1.151:8081/create"
var server = app.listen(8081, '192.168.1.151', () => {console.log("server is running!")})