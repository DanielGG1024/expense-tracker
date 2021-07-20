const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const methodOverride = require('method-override')
const toDate = require('./tools/handlebarsHelpers')

require('./config/mongoose')
const app = express()

app.engine('hbs', exphbs({
    defaultLayout: 'main', extname: '.hbs', helpers: {
        toDate
    }
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.get('/', (req, res) => {
    const categoryQuery = req.query.category
    const filter = {}
    if (categoryQuery) filter.category = categoryQuery
    
    const categories = []
    Category.find()
        .lean()
        .then(category => categories.push(...category))

    Record.find(filter)
        /********************/
        .populate('category')
        /********************/
        .lean()
        .then((records) => {
            let totalAmount = 0
            records.forEach(record => totalAmount += record.amount)
            res.render('index', { records, categories, totalAmount })
        })
        .catch(error => console.error(error))
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    const categories = []

    Category.find()
        .lean()
        .then(category => categories.push(...category))

    Record.findById(id)
        .lean()
        .then(record => res.render('edit', { record, categories }))
        .catch(error => console.log(error))
})

app.put('/edit/:id', (req, res) => {
    const id = req.params.id
    const { name, date, category, amount } = req.body

    return Record.findById(id)
        .then(record => {
            record.name = name
            record.date = date
            record.category = category
            record.amount = amount
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
    Category.find()
        .lean()
        .then(categories => res.render('new', { categories }))
        .catch(error => console.log(error))
})

app.post('/expenseTracker', (req, res) => {
    const { name, date, category, amount } = req.body
    return Record.create({
        name, date, category, amount
    })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
app.delete('/expenseTracker/:id', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(3000, () => {
    console.log('Express is running on http://localhost:3000')
})