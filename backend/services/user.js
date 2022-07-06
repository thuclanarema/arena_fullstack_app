import CloudinaryUploader from '../connector/cloudinary/index.js'
import generateSlug from '../helpers/generateSlug.js'
import Model from './../models/user.js'

export default {
  find: async (req) => {
    try {
      const { filter } = req.query

      return await Model.find(filter ? JSON.parse(filter) : {})
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  findById: async (req) => {
    try {
      const { id } = req.params

      return await Model.findById(id)
    } catch (error) {
      console.log(error)
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

      return await Model.create(data)
    } catch (error) {
      console.log(error)
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

      return await Model.update(id, data)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  delete: async (req) => {
    try {
      const { id } = req.params

      return await Model.delete(id)
    } catch (error) {
      throw error
    }
  },

  login: async (req) => {
    try {
      const { username, password } = req.body

      return await Model.login(username, password)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  getByToken: async (req) => {
    try {
      const { authorization } = req.headers

      return await Model.getByToken(authorization)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
