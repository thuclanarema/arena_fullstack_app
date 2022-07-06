const success = (res, data) => {
  return res.status(200).json({
    success: true,
    data,
  })
}

const error = (res, error, status) => {
  return res.status(status || 500).json({
    success: false,
    error: {
      ...error,
      message: error.message,
    },
  })
}

const ResponseHandler = {
  success,
  error,
}

module.exports = ResponseHandler
