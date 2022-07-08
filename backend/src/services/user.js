import CloudinaryUploader from '../connector/cloudinary/index.js'
import Repository from './../repositories/user.js'

export default {
  count: async (req) => {
    try {
      return await Repository.count()
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  find: async (req) => {
    try {
      const { page, limit } = req.query

      let _page = parseInt(page) >= 1 ? parseInt(page) : 1
      let _limit = parseInt(limit) >= 0 ? parseInt(limit) : 20

      return await Repository.find({ page: _page, limit: _limit })
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  findById: async (req) => {
    try {
      const { id } = req.params

      return await Repository.findById(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  create: async (req) => {
    try {
      let data = { ...req.body }

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
      console.log(error)
      throw error
    }
  },

  update: async (req) => {
    try {
      const { id } = req.params
      const data = { ...req.body }
      console.log('req.files :>> ', req.files)

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
      console.log(error)
      throw error
    }
  },

  delete: async (req) => {
    try {
      const { id } = req.params

      return await Repository.delete(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  login: async (req) => {
    try {
      const { username, password } = req.body

      return await Repository.login(username, password)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  getByToken: async (req) => {
    try {
      const { authorization } = req.headers

      return await Repository.getByToken(authorization)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
