import CloudinaryUploader from '../connector/cloudinary/index.js'
import generateSlug from '../helpers/generateSlug.js'
import Repository from './../repositories/user.js'

export default {
  count: async (req) => {
    try {
      return await Repository.count()
    } catch (error) {
      throw error
    }
  },

  find: async (req) => {
    try {
      const { filter } = req.query

      return await Repository.find(filter ? JSON.parse(filter) : {})
    } catch (error) {
      throw error
    }
  },

  findById: async (req) => {
    try {
      const { id } = req.params

      return await Repository.findById(id)
    } catch (error) {
      throw error
    }
  },

  create: async (req) => {
    try {
      let data = { ...req.body }

      // generate username if not any
      if (!data.username) {
        data.username = generateSlug(data.firstName + '-' + data.lastName)
      }

      if (req.files.avatar) {
        // upload to cloudinary
        let file = await CloudinaryUploader.upload(req.files.avatar[0])

        data.avatar = file.secure_url
      }

      if (req.files.photos) {
        // upload to cloudinary
        let files = []
        for (let i = 0; i < req.files.photos.length; i++) {
          let file = await CloudinaryUploader.upload(req.files.photos[i])
          files.push(file)
        }

        data.photos = files.map((item) => item.secure_url)
      }

      return await Repository.create(data)
    } catch (error) {
      throw error
    }
  },

  update: async (req) => {
    try {
      const { id } = req.params
      const data = { ...req.body }

      if (req.files.avatar) {
        // upload to cloudinary
        let file = await CloudinaryUploader.upload(req.files.avatar[0])

        data.avatar = file.secure_url
      }

      if (req.files.photos) {
        // upload to cloudinary
        let files = []
        for (let i = 0; i < req.files.photos.length; i++) {
          let file = await CloudinaryUploader.upload(req.files.photos[i])
          files.push(file)
        }

        data.photos = files.map((item) => item.secure_url)
      }

      return await Repository.update(id, data)
    } catch (error) {
      throw error
    }
  },

  delete: async (req) => {
    try {
      const { id } = req.params

      return await Repository.delete(id)
    } catch (error) {
      throw error
    }
  },

  login: async (req) => {
    try {
      const { username, password } = req.body

      return await Repository.login(username, password)
    } catch (error) {
      throw error
    }
  },

  getByToken: async (req) => {
    try {
      const { authorization } = req.headers

      return await Repository.getByToken(authorization)
    } catch (error) {
      throw error
    }
  },
}
