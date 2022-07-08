import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './src/routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createServer = () => {
  const app = express()

  app.use(express.static(path.join(__dirname, 'build')))

  for (let i = 0; i < routes.length; i++) {
    app.get(routes[i].path, function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
  }

  app.listen(3000)
}
createServer()
