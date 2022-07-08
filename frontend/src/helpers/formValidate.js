/**
 *
 * @param {Object} fieldData
 * @returns Object
 */
const validateField = (fieldData) => {
  let _fieldData = fieldData ? JSON.parse(JSON.stringify(fieldData)) : {}
  let valid = true

  try {
    const keys = _fieldData?.validate ? Object.keys(_fieldData.validate) : []

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      const { value, validate } = _fieldData

      switch (key) {
        case 'trim':
          if (value && typeof value === 'string') {
            _fieldData.value = _fieldData.value.trim()
          }
          break

        case 'required':
          if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '')
          ) {
            throw new Error(validate[key][1])
          }
          break

        case 'minlength':
          if (!value || (value && typeof value === 'string' && value.length < validate[key][0])) {
            throw new Error(validate[key][1])
          }
          break

        case 'maxlength':
          if (!value || (value && typeof value === 'string' && value.length > validate[key][0])) {
            throw new Error(validate[key][1])
          }
          break

        case 'min':
          if (typeof value === 'number' && value < validate[key][0]) {
            throw new Error(validate[key][1])
          }
          break

        case 'max':
          if (typeof value === 'number' && value > validate[key][0]) {
            throw new Error(validate[key][1])
          }
          break

        case 'pattern':
          const pattern = new RegExp(validate[key][0])
          if (!pattern.test(value)) {
            throw new Error(validate[key][1])
          }
          break

        default:
          break
      }
    }
  } catch (error) {
    valid = false
    _fieldData.error = error.message
  } finally {
    return { valid, data: _fieldData }
  }
}

/**
 *
 * @param {Object} formData
 * @returns Object
 */
const validateForm = (formData) => {
  let _formData = formData ? JSON.parse(JSON.stringify(formData)) : {}
  let valid = true

  try {
    const keys = Object.keys(_formData)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]

      const fieldValidate = validateField(_formData[key])
      _formData[key] = fieldValidate.data
      if (valid && !fieldValidate.valid) {
        valid = false
      }
    }
  } catch (error) {
    valid = false
  } finally {
    return { valid, data: _formData }
  }
}

/**
 * __test__
 */
const __test__ = () => {
  console.log('----------------------------------')
  console.log('Demo validate form:')

  const formData = {
    firstName: {
      type: 'text',
      label: 'First name',
      value: '   abc       ',
      error: '',
      required: true,
      validate: {
        trim: true,
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
        trim: true,
        required: [true, 'Required!'],
        minlength: [2, 'Too short!'],
        maxlength: [20, 'Too long!'],
      },
    },
    email: {
      type: 'text',
      label: 'Email',
      value: '',
      error: '',
      required: true,
      validate: {
        trim: true,
        required: [true, 'Required!'],
        minlength: [2, 'Too short!'],
        maxlength: [50, 'Too long!'],
        pattern: [
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Invalid email',
        ],
      },
    },
    password: {
      type: 'password',
      label: 'Password',
      value: '',
      error: '',
      required: true,
      validate: {
        trim: true,
        required: [true, 'Required!'],
        minlength: [8, 'Too short!'],
        maxlength: [50, 'Too long!'],
      },
    },
  }
  console.log('| formData :>> ', formData)

  const { valid, data } = validateForm(formData)
  console.log('| > valid :>> ', valid)
  console.log('| > data :>> ', data)
}
// __test__()

const FormValidate = {
  validateField,
  validateForm,
}

export default FormValidate
