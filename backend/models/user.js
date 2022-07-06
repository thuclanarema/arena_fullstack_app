import { DataTypes } from 'sequelize'
import PostgresSequelize from '../connector/postgres/index.js'

import CountryModel from './country.js'

const Model = PostgresSequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
  role: {
    type: DataTypes.ENUM('GUEST', 'MEMBERSHIP', 'ADMIN'),
    defaultValue: 'GUEST',
  },
  avatar: {
    type: DataTypes.STRING,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
})

Model.prototype.toJSON = function () {
  var values = Object.assign({}, this.get())

  delete values.password
  delete values.countryId

  return values
}

Model.belongsTo(CountryModel)

Model.sync()

export default Model
