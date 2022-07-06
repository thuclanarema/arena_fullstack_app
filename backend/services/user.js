const generateSlug = require('../helpers/generateSlug')
const Model = require('./../models/user')

const find = async (req) => {
  try {
    const { filter } = req.query

    return await Model.find(filter ? JSON.parse(filter) : {})
  } catch (error) {
    throw error
  }
}

const findById = async (req) => {
  try {
    const { id } = req.params

    return await Model.findById(id)
  } catch (error) {
    throw error
  }
}

const create = async (req) => {
  try {
    let data = { ...req.body }

    // generate username
    data.username = data.username
      ? data.username
      : generateSlug(data.first_name + '-' + data.last_name)

    return await Model.create(data)
  } catch (error) {
    throw error
  }
}

const update = async (req) => {
  try {
    const { id } = req.params
    const data = { ...req.body }

    return await Model.update({ id, data })
  } catch (error) {
    throw error
  }
}

const _delete = async (req) => {
  try {
    const { id } = req.params

    return await Model.delete(id)
  } catch (error) {
    throw error
  }
}

const login = async (req) => {
  try {
    const { username, password } = req.body

    return await Model.login({ username, password })
  } catch (error) {
    throw error
  }
}

const getUserByToken = async (req) => {
  try {
    const { authorization } = req.headers

    return await Model.getUserByToken(authorization)
  } catch (error) {
    throw error
  }
}

module.exports = {
  find,
  findById,
  create,
  update,
  delete: _delete,
  login,
  getUserByToken,
}
