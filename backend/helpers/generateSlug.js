const removeVietnameseTones = require('./removeVietnameseTones')

/**
 *
 * @param {String} value
 * @param {Number} length
 * @param {Boolean} timestamp
 * @returns String
 */
const generateSlug = (value, length, timestamp) => {
  try {
    if (value) {
      let slug = value
      slug = removeVietnameseTones(slug)
      slug = slug.slice(0, length || value.length)
      slug = slug
        .toLowerCase()
        .trim()
        .replace(/\./g, '')
        .replace(/\s/g, '-')
        .replace(/---+/g, '-')
        .replace(/--+/g, '-')

      if (timestamp) {
        slug = slug + '-' + Date.now()
      }

      return slug
    }

    return ''
  } catch (error) {
    console.log('generateSlug error', error)
    return ''
  }
}

module.exports = generateSlug
