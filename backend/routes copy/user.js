const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user')
const UserValidator = require('../validator/user')
const AuthValidator = require('../validator/auth')

router.get('/', Controller.find)
router.post('/', UserValidator.create, Controller.create)
router.get('/me', AuthValidator.verifyToken, Controller.getUserByToken)
router.post('/login', UserValidator.login, Controller.login)
router.get('/:id', Controller.findById)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router
