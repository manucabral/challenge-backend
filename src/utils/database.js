/**
 * @file Contains database utils.
 */

/**
 * Fills a table with data.
 * @param {Object} model - The model to fill.
 */
const fill = async (model) => {
  try {
    const table_name = model.getTableName()
    const data = require(`../data/${table_name}.json`)
    await model.bulkCreate(data)
    console.log(`Table ${table_name} filled successfully`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = fill
