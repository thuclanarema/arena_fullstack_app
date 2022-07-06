import { Sequelize, DataTypes } from 'sequelize'
import PostgresSequelize from '../connector/postgres/index.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

const { JWT_SECRET, JWT_EXPIRATION } = process.env

const User = PostgresSequelize.define('users', {
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
    type: DataTypes.UUID,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'compositeIndex',
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
})

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get())

  delete values.password

  return values
}

User.sync()

const find = async (filter) => {
  try {
    return await User.findAll(filter)
  } catch (error) {
    throw error
  }
}

const findById = async (id) => {
  try {
    let res = await User.findOne({ where: { id } })
    if (!res) {
      throw new Error('Not found')
    }
    return res
  } catch (error) {
    throw error
  }
}

const create = async (data) => {
  try {
    // generate password encode
    const salt = bcrypt.genSaltSync(10)
    const passwordEncode = bcrypt.hashSync(data.password, salt)
    data.password = passwordEncode

    // generate username if not any

    return await User.create(data)
  } catch (error) {
    throw error
  }
}

const update = async ({ id, data }) => {
  try {
    await findById(id)

    // cannot allow update specific fields
    delete data.email
    delete data.username
    delete data.password

    res = await User.update(data, {
      where: { id },
      returning: true,
      plain: true,
    })
    return res[1]
  } catch (error) {
    throw error
  }
}

const _delete = async (id) => {
  try {
    await findById(id)

    return await User.destroy({ where: { id } })
  } catch (error) {
    throw error
  }
}

const login = async ({ username, password }) => {
  try {
    let user = null
    if (!user) {
      user = await User.findOne({ where: { username } })
    }
    if (!user) {
      user = await User.findOne({ where: { email: username } })
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
}

const getUserByToken = async (token) => {
  try {
    const bearerToken = token.replace(/Bearer /g, '').replace(/\s/g, '')
    const decoded = await jwt.verify(bearerToken, JWT_SECRET)

    if (decoded && decoded.email) {
      let user = await User.findOne({ where: { email: decoded.email } })
      if (user && user.email === decoded.email) {
        return user
      }
    }

    throw new Error('Unauthorized')
  } catch (error) {
    throw error
  }
}

export default {
  find,
  findById,
  create,
  update,
  delete: _delete,
  login,
  getUserByToken,
}
