const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const toDate = require('./tools/handlebarsHelpers')
app.engine('hbs', exphbs({
    defaultLayout: 'main', extname: '.hbs', helpers: {
        toDate
    }
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

app.listen(PORT, () => {
    console.log(`Express is running on http://localhost:${PORT}`)
})