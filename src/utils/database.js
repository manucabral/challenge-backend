/**
 * @file Contains database utils.
 */

/**
 * Fills a table with data.
 * @param {Object} model - The model to fill.
 * @param {Object} options - The options object to fill the table.
 */
const fill = async (model, options) => {
  const bulk = options && options.bulk
  try {
    const table_name = model.getTableName()
    const data = require(`../data/${table_name}.json`)
    if (!bulk) await model.create(data)
    else await model.bulkCreate(data)
    console.log(`Table ${table_name} filled successfully`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = fill
