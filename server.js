var express = require("express");
var mongoose = require("mongoose");
var db = require("./models");

var PORT = 3000;

mongoose.connect("mongodb://localhost/magicScraper", { useNewUrlParser: true });

// Initialize Express
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


require("./routes/scrape")(app)
require('./routes/getArticles')(app)
require('./routes/getArticle') (app)
require('./routes/postComment')(app)

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
