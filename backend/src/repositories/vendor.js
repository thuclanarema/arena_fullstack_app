import Model from '../models/vendor.js'
import { Op } from 'sequelize'

const count = async () => {
  try {
    return await Model.count()
  } catch (error) {
    throw error
  }
}

const find = async ({ page, limit, keyword }) => {
  try {
    const _page = page ? (parseInt(page) >= 1 ? parseInt(page) : 1) : 1
    const _limit = limit ? (parseInt(limit) >= 1 ? parseInt(limit) : 20) : 20

    let where = {}
    if (keyword) {
      where = {
        [Op.or]: [{ name: { [Op.like]: `%${keyword}%` } }],
      }
    }
    const count = await Model.count(where)

    const items = await Model.findAll({
      where,
      limit,
      offset: (_page - 1) * _limit,
      order: [['updatedAt', 'DESC']],
    })
    return {
      items,
      totalItems: count,
      limit: _limit,
      page: _page,
      totalPages: Math.ceil(count / _limit),
    }
  } catch (error) {
    throw error
  }
}

const findById = async (id) => {
  try {
    let entry = await Model.findOne({ where: { id } })
    if (!entry) {
      throw new Error('Not found')
    }
    return entry
  } catch (error) {
    throw error
  }
}

const create = async (data) => {
  try {
    const created = await Model.create(data)
    return findById(created.id)
  } catch (error) {
    throw error
  }
}

const update = async (id, data) => {
  try {
    const updated = await Model.update(data, { where: { id }, returning: true, plain: true })
    console.log('updated', updated)
    return findById(updated[1].id)
  } catch (error) {
    throw error
  }
}

const _delete = async (id) => {
  try {
    return await Model.destroy({ where: { id } })
  } catch (error) {
    throw error
  }
}

export default {
  count,
  find,
  findById,
  create,
  update,
  delete: _delete,
}
