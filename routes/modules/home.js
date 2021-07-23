const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

//主頁
// router.get('/', (req, res) => {
//     const categoryQuery = req.query.category
//     const filter = {}
//     if (categoryQuery) filter.category = categoryQuery
//     const categories = []
     
//     Category.find()
//         .lean()
//         .then(category => categories.push(...category))

//     Record.find(filter)
//         /********************/
//         .populate('category')
//         /********************/
//         .lean()
//         .then((records) => {
//             let totalAmount = 0
//             records.forEach(record => totalAmount += record.amount)
//             res.render('index', { records, categories, totalAmount })
//         })
//         .catch(error => console.error(error))
// })

router.get('/', (req, res) => {
    const categoryQuery = req.query.category
    const filter = {}
    if (categoryQuery) filter.category = categoryQuery
    const categories = []

    Category
        .find()
        .lean()
        .then((category) => {
            Record
                .find(filter)
                .populate('category')
                .lean()
                .then((records) => {
                    categories.push(...category)
                    let totalAmount = 0
                    records.forEach(record => totalAmount += record.amount)
                    res.render('index', { records, categories, totalAmount })
                })
                .catch(error => console.error(error))
        })
})
module.exports = router