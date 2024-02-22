exports.up = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.createTable('cars', (table) => {
    table.increments('id')
    table.string('vin').notNullable().unique()
    table.string('make').nutNullable()
    table.string('model').notNullable()
    table.float('mileage').notNullable()
    table.string('title')
    table.string('transmission')
  })
};

exports.down = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.dropTableIfExists('cars')
};
