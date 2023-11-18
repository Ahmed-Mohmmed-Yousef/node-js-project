const express = require("express");
const mongoose = require("mongoose");

const app = express()

const Article = require("./models/article")

const uri = "mongodb+srv://ahmed_vscode:Ahmedvscode123@cluster0.hcxpj.mongodb.net/?retryWrites=true&w=majority";
mongoose
    .connect(uri)
    .then(() => {
        console.log('Success connection: ')
        app.listen(3000, () => {
            console.log("I'm lising in port 3000")
        })
    })
    .catch((error) => {
        console.log('Error: ', error)
    })


app.use(express.json())

app.get('/1', (req, res) => {
    res.send("Helllooqswdecdcd111");
})

app.post('/hello', (req, res) => {
    res.send("Hellloo")
})

app.get('/findSum/:num1/:num2',(req, res) => {
    res.send(req.params.num1)
})

app.get('/findSum2',(req, res) => {
    res.json({
        name: "Ahmed",
        age: "30",
        lang: 30
    })
})

app.get('/htmlfile',(req, res) => {
    res.render("numbers.ejs", {
        name: "Ahmed",
        age: 20,
    });
})

// =========== ARTICLES ENDPOINTS ===========

app.post('/articles',  async (req, res) => {
    const article = new Article()
    article.title = req.body.article_title
    article.body = req.body.article_body
    article.numberOfLikes = 0

    await article.save()

    res.json(article);
})

app.get('/articles',  async (req, res) => {
    
    try {
        const articles = await Article.find()
        res.json(articles);
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/articles/:articleId',  async (req, res) => {
    const id = req.params.articleId
    try {
        const articles = await Article.findById(id)
        res.json(articles);
    } catch (error) {
        res.json(error.message)
    }
    
})

app.delete('/articles/:articleId',  async (req, res) => {
    const id = req.params.articleId
    try {
        const articles = await Article.findByIdAndDelete(id)
        res.json(articles);
    } catch (error) {
        res.json(error.message)
    }  
})

app.get('/showArticles', async (req, res) => {

    try {
        const articles = await Article.find()
        res.render("articles.ejs", {
            "allArticles": articles
        })
    } catch(error) {

    }
})