import Model from '../models/country.js'

export default {
  count: async () => {
    try {
      return await Model.count()
    } catch (error) {
      throw error
    }
  },

  find: async ({ page, limit }) => {
    try {
      const count = await Model.count()
      const items = await Model.findAll({ limit, offset: (page - 1) * limit })

      return {
        items,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      }
    } catch (error) {
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
      throw error
    }
  },

  create: async (data) => {
    try {
      return await Model.create(data)
    } catch (error) {
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
      throw error
    }
  },
}
