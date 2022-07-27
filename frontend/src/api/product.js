import apiCaller from '../helpers/apiCaller.js'

const count = async () => {
  return await apiCaller(`/api/products/count`)
}

const find = async (query) => {
  return await apiCaller(`/api/products${query}`)
}

const findById = async (id) => {
  return await apiCaller(`/api/products/${id}`)
}

const create = async (data) => {
  const formData = new FormData()
  Object.keys(data)
    .filter((name) => !['images'].includes(name))
    .forEach((name) => formData.append(name, data[name]))

  if (data['images']?.length) {
    data['images'].forEach((item) => formData.append('images', item))
  }

  return await apiCaller(`/api/products`, 'POST', formData)
}

const update = async (id, data) => {
  const formData = new FormData()
  Object.keys(data)
    .filter((name) => !['images'].includes(name))
    .forEach((name) => formData.append(name, data[name]))

  if (data['images']?.length) {
    data['images'].forEach((item) => formData.append('images', item))
  }

  return await apiCaller(`/api/products/${id}`, 'PUT', formData)
}

const _delete = async (id) => {
  return await apiCaller(`/api/products/${id}`, 'DELETE')
}

const ProductApi = { count, find, findById, create, update, delete: _delete }

export default ProductApi
