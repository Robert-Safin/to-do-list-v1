//import dependencies
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import getDay from "./date.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const mongoPassword = process.env.MONGO_PASSWORD;

// create app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

connectToDb();

async function connectToDb() {
  try {
    await mongoose.connect(`mongodb+srv://admin:${mongoPassword}@cluster0.ruawe0b.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
}

const toDoSchema = new mongoose.Schema({
  name: String,
});

const ToDo = mongoose.model("ToDo", toDoSchema);

async function saveTip() {
  const items = await ToDo.find({});
  if (items.length === 0) {
    await ToDo.create({ name: "To Do List" });
  }
}
saveTip();

app.get("/", async (req, res) => {
  try {
    const toDos = await ToDo.find({});
    res.render("list", { listTitle: "Today", toDos: toDos });
  } catch (error) {
    console.log(error);
  }
});

app.post("/", async(req, res) => {

  try {
    await ToDo.create({ name: req.body.toDo })
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

});

app.post("/delete", async (req, res) => {
  const itemId = req.body.checkbox.trim();
  try {
    await ToDo.deleteOne({ _id: itemId });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
