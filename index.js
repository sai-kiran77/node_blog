const express = require('express')
const methodOverride = require('method-override')
const articleRoutes = require('./routes/article')
const app = express()
const Article = require('./db/models/article')
app.use(express.urlencoded({ extended: false }))
require('./db/mongoose')
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use('/article', articleRoutes)



app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ CreatedAt: 'desc' })
    res.render('articles/index', { articles })
})

app.listen(3000, () => {
    console.log("server is running on port 3000");

})
