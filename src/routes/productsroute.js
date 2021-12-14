const express = require('express')
const authen = require('../middleware/authentication')
const upload = require('../middleware/upload')

const {
    getAll,
    getDetail,
    getDetailProduct,
    update,
    insertProduct,
    destroy,
} = require("../controllers/productsController");

const usersRouter = express.Router()

usersRouter
.get('/products', getAll)
.get('/myproducts',authen, getDetail)
.get('/myproducts/:id',authen, getDetailProduct)
.post('/insertProducts', authen, upload, insertProduct)
.put('/updateProducts/:id', authen, upload, update)
.delete('/deleteProducts/:id',destroy)

module.exports = usersRouter;