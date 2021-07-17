const Record = require('../record')
const recordJson = require('./record.json')
const allrecord = recordJson.results

const db = require('../../config/mongoose')

db.once('open', () => {
    allrecord.forEach((item) => {
        Record.create({
            name: item.name,
            category: item.category,
            date: Date(item.date),
            amount: Number(item.amount)
        }).then(() => {
            db.close()
        })
    })
    console.log('recordSeeder done!')
})