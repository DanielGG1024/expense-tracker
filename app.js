const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./modules/record')

require('./config/mongoose')
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    Record.find()
        .lean()
        .then(records => res.render('index', { records }))
        .catch(error => console.error(error))
})

app.get('/edit', (req, res) => {
    res.render('edit')
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.listen(3000, () => {
    console.log('Express is running on http://localhost:3000')
})