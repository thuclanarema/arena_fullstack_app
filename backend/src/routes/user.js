import express from 'express'
import Controller from './../controllers/user.js'
import UserValidator from './../validator/user.js'
import AuthValidator from './../validator/auth.js'
import MulterUpload from './../connector/multer/index.js'

const router = express.Router()

router.get('/', Controller.find)
router.get('/count', Controller.count)
router.get('/:id', Controller.findById)

router.post(
  '/',
  MulterUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'photos', maxCount: 10 },
  ]),
  UserValidator.create,
  Controller.create,
)
router.post('/auth', AuthValidator.verifyToken, Controller.getByToken)
router.post('/login', UserValidator.login, Controller.login)

router.put(
  '/:id',
  MulterUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'photos', maxCount: 10 },
  ]),
  UserValidator.update,
  Controller.update,
)

router.delete('/:id', Controller.delete)

export default router
