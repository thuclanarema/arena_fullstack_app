import Repository from '../repositories/country.js'

export default {
  find: async (req) => {
    try {
      const { filter } = req.query

      return await Repository.find(filter ? JSON.parse(filter) : {})
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
      throw error
    }
  },
}
