import PropTypes from 'prop-types'
import { Button, Card, Stack, TextField } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import FormControl from '../../components/FormControl'
import FormValidate from '../../helpers/formValidate'
import MyDropZone from '../../components/MyDropZoneSingle'

CreateForm.propTypes = {
  created: PropTypes.object,
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
  vendors: PropTypes.array,
}

CreateForm.defaultProps = {
  created: {},
  onDiscard: () => null,
  onSubmit: () => null,
  vendors: [],
}

const initialFormData = {
  title: {
    type: 'text',
    label: 'Title',
    value: '',
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
  price: {
    type: 'number',
    label: 'Price',
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
  handle: {
    type: 'text',
    label: 'handle',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [50, 'Too long!'],
    },
  },
  description: {
    type: 'text',
    label: 'description',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [50, 'Too long!'],
    },
  },
  publish: {
    type: 'radio',
    label: 'publish',
    value: true,
    error: '',
    validate: {},
    options: [
      {
        label: 'True',
        value: 'true',
      },
      {
        label: 'False',
        value: 'false',
      },
    ],
  },
  status: {
    type: 'select',
    label: 'status',
    value: '',
    error: '',
    validate: {},
    options: [
      { label: 'Select a status', value: '' },
      {
        label: 'ACTIVE',
        value: 'ACTIVE',
      },
      {
        label: 'DRAFT',
        value: 'DRAFT',
      },
      {
        label: 'ARCHIVED',
        value: 'ARCHIVED',
      },
    ],
  },
  vendorId: {
    type: 'select',
    label: 'Vendor',
    value: '',
    error: '',
    validate: {},
    options: [{ label: 'Select a country', value: '' }],
  },
  thumbnail: {
    type: 'file',
    label: 'thumbnail',
    value: null,
    originValue: null,
    error: '',
    validate: {},
    allowMultiple: false,
  },
  images: {
    type: 'file',
    label: 'images',
    value: [],
    originValue: [],
    error: '',
    validate: {},
    allowMultiple: true,
  },
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit, vendors } = props

  const [formData, setFormData] = useState(initialFormData)

  console.log('formData :>> ', formData)

  // because vendors and something can change value when Call api , we need to put into useEffect
  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(formData))
    _formData.vendorId = {
      ..._formData.vendorId,
      options: [
        { label: 'Select a vendor', value: '' },
        ...vendors.map((item) => ({ label: item.name, value: '' + item.id })),
      ],
    }

    /**
     * test
     */
    // _formData.title.value = 'david'
    // _formData.price.value = 'pham'
    // _formData.handle.value = `david-pham-${Date.now()}`
    // _formData.description.value = `david-pham-${Date.now()}@gmail.com`
    // _formData.publish.value = Boolean(Math.random() > 0.4)
    // _formData.status.value =
    // _formData.vendorId.value = String(vendors[Math.floor(Math.random() * vendors.length)].id)

    if (created.id) {
      Array.from(['title', 'price', 'handle', 'description', 'status', 'vendorId']).map(
        (key) => (_formData[key] = { ..._formData[key], value: String(created[key] || '') }),
      )
      Array.from(['publish']).map(
        (key) => (_formData[key] = { ..._formData[key], value: Boolean(created[key] || '') }),
      )
      Array.from(['thumbnail']).map(
        (key) => (_formData[key] = { ..._formData[key], originValue: String(created[key]) }),
      )
      Array.from(['images']).map(
        (key) => (_formData[key] = { ..._formData[key], originValue: created[key] || [] }),
      )
    }

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    Array.from(['thumbnail', 'images']).forEach((key) => (_formData[key] = formData[key]))
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      const { valid, data } = FormValidate.validateForm(formData)

      if (valid) {
        data['thumbnail'].value = formData['thumbnail'].value
        data['images'].value = formData['images'].value

        onSubmit(data)
      } else {
        setFormData(data)

        throw new Error('Invalid form data')
      }
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    }
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader title={created.id ? 'Edit product' : 'Add product'} onBack={onDiscard} />

      <Card sectioned>
        <Stack vertical alignment="fill">
          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['title']}
                onChange={(value) => handleChange('title', value)}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['price']}
                onChange={(value) => handleChange('price', value)}
              />
            </Stack.Item>
          </Stack>
          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['handle']}
                onChange={(value) => handleChange('handle', value)}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['description']}
                onChange={(value) => handleChange('description', value)}
              />
            </Stack.Item>
          </Stack>
          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['publish']}
                onChange={(value) => handleChange('publish', value)}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['status']}
                onChange={(value) => handleChange('status', value)}
              />
            </Stack.Item>
          </Stack>

          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['vendorId']}
                onChange={(value) => handleChange('vendorId', value)}
              />
            </Stack.Item>
            <Stack.Item fill></Stack.Item>
          </Stack>
          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['thumbnail']}
                onChange={(value) => handleChange('thumbnail', value)}
                onDeleteOriginValue={(value) => {
                  let _formData = JSON.parse(JSON.stringify(formData))
                  Array.from(['thumbnail', 'images']).forEach(
                    (key) => (_formData[key] = formData[key]),
                  )
                  _formData['thumbnail'] = {
                    ..._formData['thumbnail'],
                    originValue: '',
                    error: '',
                  }
                  setFormData(_formData)
                }}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['images']}
                onChange={(value) => handleChange('images', value)}
                onDeleteOriginValue={(value) => {
                  let _formData = JSON.parse(JSON.stringify(formData))
                  Array.from(['thumbnail', 'images']).forEach(
                    (key) => (_formData[key] = formData[key]),
                  )
                  _formData['images'] = {
                    ..._formData['images'],
                    originValue: _formData['images'].originValue.filter((item) => item !== value),
                    error: '',
                  }
                  setFormData(_formData)
                }}
              />
            </Stack.Item>
          </Stack>
        </Stack>
      </Card>

      <Stack distribution="trailing">
        <Button onClick={onDiscard}>Discard</Button>
        <Button primary onClick={handleSubmit}>
          {created.id ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default CreateForm
