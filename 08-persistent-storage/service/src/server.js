const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserController = require("./user.controller");
const MONGO_URI = process.env.MONGO_URI; //mongodb+srv://admin:admin@cluster0.m5noi.mongodb.net/db?retryWrites=true&w=majority

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((error) => console.log("Error connecting to mongo", error));

const app = express();
app.use(bodyParser.json());

app.get("/user", UserController.handleGetAll);
app.post("/user", UserController.handleCreate);
app.get("/user/:id", UserController.handleGetById);
app.delete("/user/:id", UserController.handleDelete);

module.exports = app;
