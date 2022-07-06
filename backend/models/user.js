import { Sequelize, DataTypes } from 'sequelize'
import PostgresSequelize from '../connector/postgres/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { JWT_SECRET, JWT_EXPIRATION } = process.env

const Model = PostgresSequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
  role: {
    type: DataTypes.ENUM('GUEST', 'MEMBERSHIP', 'ADMIN'),
    defaultValue: 'GUEST',
  },
  avatar: {
    type: DataTypes.STRING,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
})

Model.prototype.toJSON = function () {
  var values = Object.assign({}, this.get())

  delete values.password

  return values
}

Model.sync()

export default {
  find: async (filter) => {
    try {
      return await Model.findAll(filter)
    } catch (error) {
      throw error
    }
  },

  findById: async (id) => {
    try {
      let res = await Model.findOne({ where: { id } })
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
      let res = await Model.findOne({ where: { id } })
      if (!res) {
        throw new Error('Not found')
      }

      // cannot allow update specific fields
      delete data.email
      delete data.username
      delete data.password
      delete data.role

      res = await Model.update(data, {
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
      let res = await Model.findOne({ where: { id } })
      if (!res) {
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
        user = await Model.findOne({ where: { username } })
      }
      if (!user) {
        user = await Model.findOne({ where: { email: username } })
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
        let user = await Model.findOne({ where: { email: decoded.email } })
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
