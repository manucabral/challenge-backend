/**
 * @file Contains file utils.
 */

// required modules
const { HOST, PORT } = require('../config')

/**
 * Uploads an image to the server if files are provided.
 * @param {Object} files - The files header object.
 * @returns {String} The image url.
 */
const uploadImage = async (files) => {
  let image_url = `http://${HOST}:${PORT}/images/default.png`
  if (files && files.image) {
    const { image } = files
    await image.mv(`${process.cwd()}/public/images/${image.name}`)
    image_url = `http://${HOST}:${PORT}/images/${image.name}`
  }
  return image_url
}

module.exports = {
  uploadImage,
}
