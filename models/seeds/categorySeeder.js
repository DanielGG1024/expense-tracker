const Category = require('../category')
const categoryJson = require('./category.json')
const allCategory = categoryJson.results

const db = require('../../config/mongoose')

db.once('open', () => {
    allCategory.forEach((item) => {
        Category.create({
            category: item.category,
            icon: item.icon
        }).then(() => {
            db.close()
        })
    })
    console.log('categorySeeder done!!')
})