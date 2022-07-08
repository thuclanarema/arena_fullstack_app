import Model from '../models/user.js'
import CountryModel from '../models/country.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { JWT_SECRET, JWT_EXPIRATION } = process.env

const include = [{ model: CountryModel, as: 'country' }]

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
      const items = await Model.findAll({
        limit,
        offset: (page - 1) * limit,
        include,
        order: [['updatedAt', 'DESC']],
      })

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
      const res = await Model.findOne({
        where: { id },
        include,
      })
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
      // generate password encode
      const salt = bcrypt.genSaltSync(10)
      const passwordEncode = bcrypt.hashSync(data.password, salt)
      data.password = passwordEncode

      return await Model.create(data)
    } catch (error) {
      throw error
    }
  },

  update: async (id, data) => {
    try {
      const entry = await Model.findOne({
        where: { id },
        include,
      })
      if (!entry) {
        throw new Error('Not found')
      }
      // generate password encode
      const salt = bcrypt.genSaltSync(10)
      const passwordEncode = bcrypt.hashSync(data.password, salt)
      data.password = passwordEncode

      // cannot allow update specific fields
      delete data.role

      await Model.update(data, {
        where: { id },
        returning: true,
        plain: true,
        include,
      })

      return await Model.findOne({
        where: { id },
        include,
      })
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

  login: async (username, password) => {
    try {
      let user = null
      if (!user) {
        user = await Model.findOne({
          where: { username },
          include,
        })
      }
      if (!user) {
        user = await Model.findOne({
          where: { email: username },
          include,
        })
      }
      if (!user) {
        throw new Error('Username or Password incorrect')
      }

      // compare password
      const passwordCompare = await bcrypt.compareSync(password, user.password)
      if (!passwordCompare) {
        throw new Error('Username or Password incorrect')
      }

      const token = await jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      })

      return { user, token }
    } catch (error) {
      throw error
    }
  },

  getByToken: async (token) => {
    try {
      const bearerToken = token.replace(/Bearer /g, '').replace(/\s/g, '')
      const decoded = await jwt.verify(bearerToken, JWT_SECRET)

      if (decoded && decoded.email) {
        let user = await Model.findOne({ where: { email: decoded.email }, include })
        if (user && user.email === decoded.email) {
          return user
        }
      }

      throw new Error('Unauthorized')
    } catch (error) {
      throw error
    }
  },
}
