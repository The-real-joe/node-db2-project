const db = require('../cars/cars-model')
const cars = require('../cars/cars-model')


const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const findCar = await cars.getById(req.params.id)
    if (!findCar) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` })
    } else {
      req.car = findCar
      next()
    }
  } catch(err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
    res.status(400).json({ message: 'vin, make, model, and mileage are required' })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vin = require('vin-validator')
  if(!vin.isValid(req.body.vin)) {
    res.status(400).json({ message: 'vin is invalid' })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
try{
  const vinExist = await cars.getByVin(req.body.vin)
  if(vinExist) {
    res.status(400).json({ message: 'vin must be unique' })
  } else {
    next()
  }
} catch(err) {
  next(err)
}
}

const checkPutPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.title || !req.body.transmission) {
    res.status(400).json({ message: 'title and transmission are required' })
  } else {
    next()
  }
}



module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  checkPutPayload
}