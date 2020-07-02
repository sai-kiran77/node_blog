const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify=require('dompurify')
const { JSDOM }=require('jsdom')
const dompurify=createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Markdown: {
        type: String,
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanatizedHtml:{
        type:String,
        required:true
    }
})

articleSchema.pre('validate',function(next){
    if(this.Title){
        this.slug=slugify(this.Title,{lowe:true,strict:true})
    }

    if(this.Markdown){
        this.sanatizedHtml=dompurify.sanitize(marked(this.Markdown))
    }

    next()
})

const MyModel = mongoose.model('articles', articleSchema);

module.exports = MyModel