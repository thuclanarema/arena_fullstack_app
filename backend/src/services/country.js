import Repository from '../repositories/country.js'

export default {
  count: async (req) => {
    try {
      return await Repository.count()
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  find: async (req) => {
    try {
      const { page, limit } = req.query

      let _page = parseInt(page) >= 1 ? parseInt(page) : 1
      let _limit = parseInt(limit) >= 0 ? parseInt(limit) : 20

      return await Repository.find({ page: _page, limit: _limit })
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  findById: async (req) => {
    try {
      const { id } = req.params

      return await Repository.findById(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  create: async (req) => {
    try {
      let data = { ...req.body }

      return await Repository.create(data)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  update: async (req) => {
    try {
      const { id } = req.params
      const data = { ...req.body }

      return await Repository.update(id, data)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  delete: async (req) => {
    try {
      const { id } = req.params

      return await Repository.delete(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
