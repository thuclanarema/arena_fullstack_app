import Model from '../models/country.js'

export default {
  find: async (filter) => {
    try {
      return await Model.findAll(filter)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  findById: async (id) => {
    try {
      const res = await Model.findOne({ where: { id } })
      if (!res) {
        throw new Error('Not found')
      }

      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  create: async (data) => {
    try {
      return await Model.create(data)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  update: async (id, data) => {
    try {
      let entry = await Model.findOne({ where: { id } })
      if (!entry) {
        throw new Error('Not found')
      }

      const res = await Model.update(data, {
        where: { id },
        returning: true,
        plain: true,
      })

      return res[1]
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  delete: async (id) => {
    try {
      let entry = await Model.findOne({ where: { id } })
      if (!entry) {
        throw new Error('Not found')
      }

      return await Model.destroy({ where: { id } })
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
