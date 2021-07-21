const mongoose = require('mongoose')
const MONGODB = process.env.MONGODB || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db