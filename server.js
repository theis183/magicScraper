var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")
var db = require('./models')

var PORT = 3000;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/magicScraper";

mongoose.connect(MONGODB_URI);

// Initialize Express
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



require("./routes/scrape")(app)
require('./routes/getArticles')(app)
require('./routes/getArticle') (app)
require('./routes/postComment')(app)

app.get("/", function(req, res) {
  db.Article.find({}).then(function(dbArticle) {
      res.render("index", {'articles':dbArticle})
  }).catch(function(err){
      res.json(err)
  })
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
