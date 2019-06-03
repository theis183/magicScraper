var db = require('../models')

module.exports = function (app) {
    app.post("/articles/:id", function(req, res) {
        db.Comment.create(req.body)
        .then(function(dbComment){
            return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {comment: dbComment._id}}, {new: true})
        }).then(function(dbArticle){
            res.json(dbArticle)
        }).catch(function(err){
            res.json(err)
        })
    })
}