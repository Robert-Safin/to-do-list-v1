//import dependencies
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import getDay from './date.js';

// create app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let toDos = []
let toWorks = []

const day = getDay()

// connect root
app.get("/", (req, res) => {
  res.render("list", { listTitle: day, toDos: toDos });
});

app.post('/', (req, res) => {
  const toDo = req.body.toDo
  if (req.body.list === "Work") {
    toWorks.push(toDo);
    res.redirect('/work')
  } else {
    toDos.push(toDo);
    res.redirect('/')
  }
})

app.get('/work', (req, res) => {
  res.render("list", {listTitle: "Work", toDos: toWorks})
})

app.get('/about', (req, res) => {
  res.render("about")
})

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
