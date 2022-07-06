import 'dotenv/config'

/**
 * https://sequelize.org/docs/v6/getting-started/
 */

import { Sequelize } from 'sequelize'

const { POSTGRES_USER, POSTGRES_PWD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env

const PostgresSequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PWD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
)

const __test__ = async () => {
  try {
    await PostgresSequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
__test__()

export default PostgresSequelize
