/**
 *
 * @param {Object} fieldData
 * @returns Object
 */
const validateField = (fieldData) => {
  let data = JSON.parse(JSON.stringify(fieldData))

  try {
    const { value, validate } = data

    let valid = true

    const keys = Object.keys(validate)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]

      switch (key) {
        case 'type':
          if (typeof value !== validate[key][0]) {
            throw { message: validate[key][1] }
          }
          break

        case 'required':
        case 'require':
          if (value === undefined || value?.trim() === '') {
            throw { message: validate[key][1] }
          }
          break

        case 'minlength':
          if (!value || value?.length < validate[key][0]) {
            throw { message: validate[key][1] }
          }
          break

        case 'maxlength':
          if (!value || value?.length > validate[key][0]) {
            throw { message: validate[key][1] }
          }
          break

        case 'trim':
          if (value && typeof value === 'string') {
            data.value = fieldData.value.trim()
          }
          break

        default:
          break
      }
    }

    return { valid, data }
  } catch (error) {
    data.error = error.message

    return { valid: false, data }
  }
}

/**
 *
 * @param {Object} formData
 * @returns Object
 */
const validateForm = (formData) => {
  let data = JSON.parse(JSON.stringify(formData))
  console.log('validateForm')

  try {
    let valid = true

    const keys = Object.keys(formData)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]

      const fieldValidate = validateField(data[key])
      if (!fieldValidate.valid) {
        valid = false
      }
      data[key] = fieldValidate.data

      console.log('key :>> ', key, fieldValidate.valid, fieldValidate.data)
    }

    console.log('{ valid, data } :>> ', { valid, data })

    return { valid, data }
  } catch (error) {
    return { valid: false, data }
  }
}

const FormValidate = {
  validateField,
  validateForm,
}

export default FormValidate
