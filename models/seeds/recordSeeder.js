const Record = require('../record')
const Category = require('../category')
const recordJson = require('./record.json')
let allrecord = recordJson.results

const db = require('../../config/mongoose')



db.once('open', () => {
    const categoryList = {}
    Category.find()
        .lean()
        .then(categories => {
            categories.forEach(item => {
                categoryList[item.category] = item._id
                // console.log(categoryList)
            })
            return allrecord.map(record => ({
                name: record.name,
                date: record.date,
                category: categoryList[record.category],
                amount: record.amount
            }))
        })
        // .then(allrecord => console.log(allrecord))
        .then(allrecord => {
            Record.create(allrecord)
                .then(() => {
                    console.log('Record seeder done!')
                    return db.close()
                })
        })
        .catch(error => console.error(error))
})