import PropTypes from 'prop-types'
import { Button, Card, Stack, TextField } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import FormControl from '../../components/FormControl'
import FormValidate from '../../helpers/formValidate'

CreateForm.propTypes = {
  created: PropTypes.object,
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
  countries: PropTypes.array,
}

CreateForm.defaultProps = {
  created: {},
  onDiscard: () => null,
  onSubmit: () => null,
  countries: [],
}

const initialFormData = {
  firstName: {
    type: 'text',
    label: 'First name',
    value: '',
    error: '',
    required: true,
    validate: {
      type: ['string', 'Invalid type!'],
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [20, 'Too long!'],
    },
    autoFocus: true,
  },
  lastName: {
    type: 'text',
    label: 'Last name',
    value: '',
    error: '',
    required: true,
    validate: {
      type: ['string', 'Invalid type!'],
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [20, 'Too long!'],
    },
  },
  username: {
    type: 'text',
    label: 'Username',
    value: '',
    error: '',
    required: true,
    validate: {
      type: ['string', 'Invalid type!'],
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [50, 'Too long!'],
    },
  },
  email: {
    type: 'text',
    label: 'Email',
    value: '',
    error: '',
    required: true,
    validate: {
      type: ['string', 'Invalid type!'],
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [50, 'Too long!'],
    },
  },
  password: {
    type: 'password',
    label: 'Password',
    value: '',
    error: '',
    required: true,
    validate: {
      type: ['string', 'Invalid type!'],
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [50, 'Too long!'],
    },
  },
  confirmPassword: {
    type: 'password',
    label: 'Confirm password',
    value: '',
    error: '',
    required: true,
    validate: {
      type: ['string', 'Invalid type!'],
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [50, 'Too long!'],
    },
  },
  gender: {
    type: 'radio',
    label: 'Gender',
    value: false,
    error: '',
    validate: {},
    options: [
      {
        label: 'Male',
        value: true,
      },
      {
        label: 'Female',
        value: false,
      },
    ],
  },
  birthday: {
    type: 'date',
    label: 'Birthday',
    value: null,
    error: '',
    validate: {},
  },
  country: {
    type: 'select',
    label: 'Country',
    value: '',
    error: '',
    validate: {},
    options: [],
  },
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit, countries } = props

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => console.log('formData :>> ', formData), [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(initialFormData))

    if (countries.length) {
      _formData.country = {
        ..._formData.country,
        options: [
          { label: 'Select a country', value: '' },
          ...countries.map((item) => ({ label: item.name, value: '' + item.id })),
        ],
      }
    }

    if (created?.id) {
      Array.from(['firstName', 'lastName', 'username', 'email', 'password']).map(
        (key) => (_formData[key] = { ..._formData[key], value: created[key] || '' }),
      )

      _formData['firstName'] = { ..._formData['firstName'], value: created['firstName'] || '' }
      _formData['lastName'] = { ..._formData['lastName'], value: created['lastName'] || '' }
      _formData['username'] = {
        ..._formData['username'],
        value: created['username'] || '',
        disabled: true,
      }
      _formData['email'] = { ..._formData['email'], value: created['email'] || '', disabled: true }
      _formData['password'] = { ..._formData['password'], disabled: true }
      _formData['confirmPassword'] = { ..._formData['confirmPassword'], disabled: true }
      _formData['gender'] = { ..._formData['gender'], value: created['gender'] || false }
      _formData['country'] = { ..._formData['country'], value: '' + created['country']?.id || '' }
    }

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      const { valid, data } = FormValidate.validateForm(formData)
      if (valid) {
        // check password match password confirm
        if (formData['password'].value !== formData['confirmPassword'].value) {
          let _formData = JSON.parse(JSON.stringify(formData))
          _formData['password'].error = 'Password and Confirm password do not match!'
          _formData['confirmPassword'].error = 'Password and Confirm password do not match!'
          setFormData(_formData)

          throw { message: 'Invalid form data' }
        }

        onSubmit(data)
      } else {
        setFormData(data)

        throw { message: 'Invalid form data' }
      }
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    }
  }

  return (
    <Stack vertical alignment="fill">
      <Stack.Item>
        <AppHeader title={created?.id ? 'Edit user' : 'Add user'} onBack={onDiscard} />
      </Stack.Item>

      <Stack.Item>
        <Card sectioned>
          <Stack vertical alignment="fill">
            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['firstName']}
                    onChange={(value) => handleChange('firstName', value)}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl
                    {...formData['lastName']}
                    onChange={(value) => handleChange('lastName', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['username']}
                    onChange={(value) => handleChange('username', value)}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl
                    {...formData['email']}
                    onChange={(value) => handleChange('email', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['gender']}
                    onChange={(value) => handleChange('gender', value)}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl
                    {...formData['birthday']}
                    onChange={(value) => handleChange('birthday', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['password']}
                    onChange={(value) => handleChange('password', value)}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl
                    {...formData['confirmPassword']}
                    onChange={(value) => handleChange('confirmPassword', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['country']}
                    onChange={(value) => handleChange('country', value)}
                  />
                </Stack.Item>
                <Stack.Item fill></Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </Card>
      </Stack.Item>

      <Stack.Item>
        <Stack distribution="trailing">
          <Button onClick={onDiscard}>Discard</Button>
          <Button primary onClick={handleSubmit}>
            {created?.id ? 'Save' : 'Add'}
          </Button>
        </Stack>
      </Stack.Item>
    </Stack>
  )
}

export default CreateForm
