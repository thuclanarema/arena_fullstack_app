import 'dotenv/config'
import axios from 'axios'

import users from './users.js'
import countries from './countries.js'

import UserRepository from '../repositories/user.js'
import CountryRepository from '../repositories/country.js'

const entries = [
  {
    name: 'countries',
    data: countries,
    repository: CountryRepository,
  },
  {
    name: 'users',
    data: users,
    repository: UserRepository,
  },
]

const init = async () => {
  try {
    for (let i = 0; i < entries.length; i++) {
      let { name, data, repository } = entries[i]
      console.log(`--------------------------`)
      console.log(`Create ${name}:`)

      let items = await repository.find({})
      if (items.length > 0) {
        console.log(`> ${name} already exist`)
        continue
      }

      for (let j = 0; j < data.length; j++) {
        switch (name) {
          case 'users':
            let countries = await CountryRepository.find({})
            if (countries.length) {
              data[j].countryId = countries[Math.floor(Math.random() * countries.length)].id
            }
            break

          default:
            break
        }

        await repository
          .create(data[j])
          .then((res) => {
            console.log(`| create ${name} [${j + 1}/${data.length}] success`)
          })
          .catch((err) => {
            console.log(`| create ${name} [${j + 1}/${data.length}] fail with error:`, err.message)
          })
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    return
  }
}

init()
