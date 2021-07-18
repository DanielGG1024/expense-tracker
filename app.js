const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./modules/record')
const Caterory = require('./modules/category')
const methodOverride = require('method-override')
require('./config/mongoose')
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    Caterory.find()

    Record.find()
        .lean()
        .then(records => res.render('index', { records }))
        .then(records => console.log(records))
        .catch(error => console.error(error))
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Record.findById(id)
        .lean()
        .then(record => res.render('edit', { record }))
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
    res.render('new')
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