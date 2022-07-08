import apiCaller from '../helpers/apiCaller.js'

const getCount = async () => {
  return await apiCaller(`/api/countries/count`)
}

const find = async ({ page, limit }) => {
  let _page = page ? `&page=${page}` : ``
  let _limit = limit ? `&limit=${limit}` : ``

  return await apiCaller(`/api/countries?${_page}${_limit}`)
}

const findById = async (id) => {
  return await apiCaller(`/api/countries/${id}`)
}

const create = async (data) => {
  return await apiCaller(`/api/countries`, 'POST', { product: data })
}

const update = async (id, data) => {
  return await apiCaller(`/api/countries/${id}`, 'PUT', { product: data })
}

const _delete = async (id) => {
  return await apiCaller(`/api/countries/${id}`, 'DELETE')
}

const CountryApi = { getCount, find, findById, create, update, delete: _delete }

export default CountryApi
