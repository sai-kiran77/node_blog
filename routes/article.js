const express = require('express')
const router = express.Router()
const Article = require('../db/models/article')

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.post('/', async (req, res) => {
    const article = new Article({
        Title: req.body.Title,
        Description: req.body.Description,
        Markdown: req.body.Markdown
    })
    try {
        await article.save()
        res.redirect(`/article/${article.slug}`)
    }
    catch (e) {
        res.render('articles/new', { article: article })
    }
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article })
})

router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.id })
        if (article == null) {
            throw new Error()
        }
        res.render('articles/show', { article: article })
    }
    catch (e) {
        res.redirect("/")
    }
})

router.put('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        if (article == null)
            throw new Error()
        article.Title = req.body.Title
        article.Description = req.body.Description
        article.Markdown = req.body.Markdown
        await article.save()
        res.redirect(`/article/${article.slug}`)
    } catch (e) {
        res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router