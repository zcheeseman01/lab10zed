const mongoose = require("mongoose");
const Book = require("./models/book");

const homeController = require("./controllers/homeController")
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"))

app.set("port", process.env.PORT || 3000);

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

require("dotenv").config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.get("/home", homeController.getHome);
app.get("/books/:book", homeController.getAllBooks);
app.get("/style", homeController.sendReqCss)


app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});