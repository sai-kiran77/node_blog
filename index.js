const express = require('express')
const methodOverride = require('method-override')

const articleRoutes = require('./routes/article')
const Article = require('./db/models/article')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/article', articleRoutes)

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ CreatedAt: 'desc' })
    res.render('articles/index', { articles })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);

})
