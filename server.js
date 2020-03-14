// Dependecies
var express = require("express");
var path = require("path");
var fs = require("fs");

//express app
var app = express();
var PORT = process.env.PORT || 4000;
var arryNewNotes = [];

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sending user to first AJAX page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// API notes - display ALL
app.get("/api/notes", function(req, res){

    const displayApiNotes = 
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8", (err,data) =>{
        if(err){
            return err
        }
        console.log(data)
        return data
    });

    console.log(displayApiNotes);
    return res.json(displayApiNotes)
    

});

// Adding Notes
app.post("/api/notes", function(req, res) {

    var newNotes = req.body;
   
    console.log(newNotes)

    //newNotes = JSON.stringify(newNotes)

    fs.appendFile(path.join(__dirname, "../db/db.json"), newNotes, "utf8", (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });

    fs.writeFile(path.join(__dirname, "../db/db.json"), newNotes, "utf8", (err) => {
        if (err){
            console.log(err.message)

        }
        else{
            console.log(newNotes)
        }
        
    });

    console.log(arryNewNotes[0])
    res.end();
});

app.put('/api/notes', function (req, res) {
  res.send('Got a PUT request at /user')

});

app.delete('/api/notes/:id', function (req,res){

});


// Initializes PORT to be accessed in the URL
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});