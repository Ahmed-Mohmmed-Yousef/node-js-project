const mongoose = require("mongoose");
const Schema = mongoose.Schema

const modelSchema = new Schema({
    title: String,
    body: String,
    numberOfLikes: Number
})

const Article = mongoose.model("Article", modelSchema)

module.exports = Article;