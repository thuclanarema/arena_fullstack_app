const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers

  // validate
  let paramObj = { authorization }
  let paramKeys = Object.keys(paramObj)
  for (let i = 0, leng = paramKeys.length; i < leng; i++) {
    if (!paramObj[paramKeys[i]]) {
      return ResponseHandler.error(res, {
        message: 'Unauthorized',
      })
    }
  }

  next()
}

module.exports = {
  verifyToken,
}
