const db = require('../../data/db-config');
const car = require('./cars-model');
const vin = require('vin-validator');



const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const foundCar = await car.getById(req.params.id);
    if(!foundCar) {  
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    }else {
      req.car = foundCar;
         next();
    }

  }catch (err) {
    next(err);
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC

//const { vin, make, model, mileage } = req.body;
  if (!req.body.vin) return next({ 
    status: 400, message: "vin is missing" });
  if (!req.body.make) return next({ 
    status: 400, message: "make is missing" });
  if (!req.body.model) return next({ 
    status: 400, message: "model is missing" });
  if (!req.body.mileage) return next({ 
    status: 400, message: "mileage is missing" }); // Note: Using == null to catch both null and undefined
  next();
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC 
  if(vin.validate(req.body.vin)) {
    next();
  }else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`,
    })
  }
};



const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  //const carVin = req.body.vin;
  try {
    const vinExist = await car.getByVin(req.body.vin);
    if (vinExist) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports ={
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}