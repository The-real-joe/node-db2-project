const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  const result = await ('cars')
  return result

}

const getById = async (id) => {
  // DO YOUR MAGIC
  const result = await ('cars').where('id', id).first()
  return result
}

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await ('cars').insert(car)
  const result = await getById('id')
  return result
}
