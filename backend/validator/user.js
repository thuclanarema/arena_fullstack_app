import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  gender: Joi.boolean(),
  birthday: Joi.string(),
  avatar: Joi.any(),
  photo: Joi.any(),
  countryId: Joi.number(),
})

export default {
  create: async (req, res, next) => {
    try {
      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res, next) => {
    try {
      await schema.validateAsync(req.body)

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
