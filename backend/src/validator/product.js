import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const schema = {
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(200).required(),
  handle: Joi.string().min(3).max(30).required(),
  price: Joi.number().integer().min(1).required(),
  publish: Joi.any(),
  status: Joi.string().valid('ACTIVE', 'DRAFT', 'ARCHIVED').required(),
  thumbnail: Joi.any(),
  images: Joi.any(),
  vendorId: Joi.any(),
}

let createSchema = {}

Array.from([
  'title',
  'description',
  'handle',
  'price',
  'publish',
  'status',
  'thumbnail',
  'images',
  'vendorId',
]).forEach((key) => (createSchema[key] = schema[key]))
createSchema = Joi.object(createSchema)

let updateSchema = {}
Array.from([
  'title',
  'description',
  'handle',
  'price',
  'publish',
  'status',
  'thumbnail',
  'images',
  'vendorId',
]).forEach((key) => (updateSchema[key] = schema[key]))
updateSchema = Joi.object(updateSchema)

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
      console.log(req.body)
      await updateSchema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
