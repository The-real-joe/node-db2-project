// DO YOUR MAGIC
const express = require('express');

const router = express.Router();

const carModel = require('./cars-model');
const{  checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require('./cars-middleware');
//const vinNumber = require('vin-validator')


router.get('/', async (req, res, next) => {
    try {
         const model = await carModel.getAll();
         res.json(model);
    } catch (err) {
           next(err)
    }
})


router.get('/:id', checkCarId, async (req, res, next) => {
    res.status(200).json(req.car);
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
       const newCar = await carModel.create(req.body);
       res.status(201).json(newCar);
    } catch (err) {
       next(err);
    }
})

// router.put('/:id', checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
//     try {
//           const updateCar = await carModel.update(req.params.id, req.body);
//           res.status(200).json(updateCar);
//     }catch (err) {
//        next(err);
//     }
// })

module.exports = router