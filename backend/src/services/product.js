import Repository from '../repositories/product.js'

export default {
  count: async (req) => {
    try {
      return await Repository.count()
    } catch (error) {
      throw error
    }
  },
  find: async (req) => {
    try {
      return await Repository.find(req.query)
    } catch (error) {
      throw error
    }
  },
  findById: async (req) => {
    try {
      const { id } = req.params
      return await Repository.findById(id)
    } catch (error) {
      throw error
    }
  },
  create: async (req) => {
    try {
      let data = { ...req.body }
      return Repository.create(data)
    } catch (error) {
      throw error
    }
  },
  update: async (req) => {
    try {
      const { id } = req.params
      let data = { ...req.body }
      return Repository.update(id, data)
    } catch (error) {
      throw error
    }
  },
  delete: async (req) => {
    try {
      const { id } = req.params
      return Repository.delete(id)
    } catch (error) {
      throw error
    }
  },
}
