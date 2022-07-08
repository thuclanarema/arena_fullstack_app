import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const schema = {
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  gender: Joi.any(),
  birthday: Joi.any(),
  avatar: Joi.any(),
  photo: Joi.any(),
  countryId: Joi.any(),
}

let createSchema = {}
Array.from([
  'firstName',
  'lastName',
  'email',
  'username',
  'password',
  'gender',
  'birthday',
  'avatar',
  'photo',
  'countryId',
]).forEach((key) => (createSchema[key] = schema[key]))
createSchema = Joi.object(createSchema)

let updateSchema = {}
Array.from([
  'firstName',
  'lastName',
  'email',
  'username',
  'password',
  'gender',
  'birthday',
  'avatar',
  'photo',
  'countryId',
]).forEach((key) => (updateSchema[key] = schema[key]))
updateSchema = Joi.object(updateSchema)

let loginSchema = {}
Array.from(['username', 'password']).forEach((key) => (loginSchema[key] = schema[key]))
loginSchema = Joi.object(loginSchema)

export default {
  create: async (req, res, next) => {
    try {
      await createSchema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res, next) => {
    try {
      await updateSchema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  login: async (req, res, next) => {
    try {
      await loginSchema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
