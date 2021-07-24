const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
// const MONGODB_URI = "mongodb+srv://root:12345@cluster0.urphq.mongodb.net/expense-tracker?retryWrites=true&w=majority" 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db