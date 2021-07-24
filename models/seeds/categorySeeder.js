const Category = require('../category')
const categoryJson = require('./category.json')
const allCategory = categoryJson.results

const db = require('../../config/mongoose')

db.once('open', () => {
    Category.create(allCategory)
        .then(() => {
            console.log('categorySeeder done!!')
            db.close()
        })
})