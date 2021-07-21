const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

//導向更新頁
router.get('/new', (req, res) => {
    Category.find()
        .lean()
        .then(categories => res.render('new', { categories }))
        .catch(error => console.log(error))
})
//執行更新
router.post('/', (req, res) => {
    const { name, date, category, amount } = req.body
    return Record.create({
        name, date, category, amount
    })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
//導向修改頁
router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    const categories = []

    Category.find()
        .lean()
        .then(category => categories.push(...category))

    Record.findById(id)
        .lean()
        .then(record => res.render('edit', { record, categories }))
        .catch(error => console.log(error))
})
//執行修改
router.put('/edit/:id', (req, res) => {
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
// 刪除
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router