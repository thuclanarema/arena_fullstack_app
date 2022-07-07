const formData = {
  firstName: {
    value: '',
    error: '',
    validate: {
      minlength: [3, 'First name character at least is 3 characters'],
      require: [true, 'First name cannot be blank'],
      ['custome_blah']: [{}, 'blah error'],
    },
  },
  lastName: {
    value: '',
    error: '',
    validate: {
      minlength: [3, 'First name character at least is 3 characters'],
      require: [true, 'First name cannot be blank'],
    },
  },
}

const handleValidate = () => {
  const result = formValidate(formData.firstName)
  // true => {success: true}
  // false => {success: false, message: ''}
}

const formValidate = ({ value, validate }) => {
  try {
    let keys = Object.keys(validate)
    // => keys = ['minlength','require']

    for (let i = 0; i < keys; i++) {
      let key = keys[i]
      switch (key) {
        case 'minlength':
          if (!value || value?.length < validate[key][0]) {
            throw validate[key][1]
          }
          break

        case 'require':
          if (!value || value?.trim() === '') {
            throw validate[key][1]
          }
          break

        case 'custome_blah':
          if (!value || value?.trim() === '') {
            throw validate[key][1]
          }
          break

        default:
          break
      }
    }

    return { success: true }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default formValidate
