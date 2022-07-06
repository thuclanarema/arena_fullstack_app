const ResponseHandler = require('../helpers/responseHandler')
const Service = require('./../services/user')

const find = async (req, res) => {
  try {
    const data = await Service.find(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    console.log(error)
    return ResponseHandler.error(res, error)
  }
}

const findById = async (req, res) => {
  try {
    const data = await Service.findById(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    return ResponseHandler.error(res, error)
  }
}

const create = async (req, res) => {
  try {
    const data = await Service.create(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    return ResponseHandler.error(res, error)
  }
}

const update = async (req, res) => {
  try {
    const data = await Service.update(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    return ResponseHandler.error(res, error)
  }
}

const _delete = async (req, res) => {
  try {
    await Service.delete(req)
    return ResponseHandler.success(res)
  } catch (error) {
    return ResponseHandler.error(res, error)
  }
}

const login = async (req, res) => {
  try {
    const data = await Service.login(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    console.log(error)
    return ResponseHandler.error(res, error)
  }
}

const getUserByToken = async (req, res) => {
  try {
    const data = await Service.getUserByToken(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    console.log(error)
    return ResponseHandler.error(res, error)
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
