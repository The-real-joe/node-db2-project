const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  const result = await db('cars')
  return result

}

const getById = async (id) => {
  // DO YOUR MAGIC
  const result = await db('cars').where('id', id).first()
  return result
}

const getByVin = async (vin) => {
  // DO YOUR MAGIC
  const result = await db('cars').where('vin', vin).first()
  return result
}

const create = (car) => {
  return db("cars").insert(car)
    .then(([id]) =>
      getById(id));
 
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}