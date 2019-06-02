var axios = require("axios")
var cheerio = require("cheerio")
var db = require('../models')

module.exports = function (app) {
app.get("/scrape", function(req, res){
    axios.get("https://magic.wizards.com/en/articles/archive").then(function(response) {
    var $ = cheerio.load(response.data);
    $('.article-item-extended').each(function(i, element){
        console.log($(this))
        var result = {}
        result.headline = $(this).children('a').children('.text').children('.title').children('h3').text()
        result.summary = $(this).children('a').children('.text').children('.description').text()
        result.link = $(this).children('a').attr('href')
        console.log(result)
        db.Article.create(result).then(function(dbArticle){
            console.log(dbArticle)
        }).catch(function(err){
            console.log(err)
        })

    })
    res.send("scrape complete")

})
})
}

