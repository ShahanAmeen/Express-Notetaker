/*
  1. A route that sends the home page
  2. A route that sends the notes page

  3. Make routes matching the fetch requests coming from the client-side code

  db.json is the make-believe database

  When a request comes in for the data:
    - Read the file (fs.readFile)

  When a request comes in to make a new note:
    - Read the file 
    - Add the new data 
    - Write a new version of that file
*/

const express = require('express');
const path = require('path');
//const api = require('./routes/index.js');
let database = require("./db/db.json")

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));// let's us use front end files


//app.use('/api', api);

//base url is localhost:3001/
// GET Route for homepage
// res is something that goes from backend to front end
// req is something that goes from front end to back end
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})


// api (controller) routes send data from db to front end based off of fetch routes
// get, post (create something new in db), put (update db), delete (delete from db)
app.get("/api/notes", (req, res) => {
  res.json(database)
})

app.post("/api/notes", (req, res) => {
  let noteModel = {
    title: req.body.title,
    text: req.body.text
  }
  
database.push(noteModel)

fs.writeFileSync("./db/db.json", JSON.stringify(database))

res.json(database)
})



// GET Route for feedback page
//app.get('/feedback', (req, res) =>
  //res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
