const express = require('express')
const authen = require('../middleware/authentication')
const upload = require('../middleware/upload')

const{
    getDetail,login,register,update
} = require('../controllers/usersController')

const usersRouter = express.Router()

usersRouter
.get('/user', authen, getDetail)
.post('/login', login)
.post('/register', register)
.put('/updateUser', authen, upload, update)

module.exports = usersRouter;