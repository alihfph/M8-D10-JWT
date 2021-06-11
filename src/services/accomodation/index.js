
import AccomodationModel from './schema.js';
import { Router } from 'express';
import { adminOnlyMiddleware, jwtAuthMiddleware } from "../../auth/index.js"

const accomorouter = Router();

accomorouter.get('/', async (req, res, next) => {
  try {
    const accomodations = await AccomodationModel.find({});
    res.status(200).send(accomodations);
  } catch (error) {
    next(error);
  }
});

accomorouter.post('/', async (req, res, next) => {
  try {
    const newAccomodation = await AccomodationModel.create(req.body);
    res.status(201).send(newAccomodation);
  } catch (error) {
    next(error);
  }
});

accomorouter.get('/:id', async (req, res, next) => {
  try {

    const id = req.params.id
    const newAccomodation = await AccomodationModel.findById(id)
    .sort("-createdAt");
    if (newAccomodation){
      res.status(200).send(newAccomodation)
    } else {
      next(new ErrorResponse("ID was not found", 404))
    }
  } catch (error) {
    next(error);
  }
});

accomorouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const newAccomodation = await AccomodationModel.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    })
    if (newAccomodation){
      res.status(200).send(newAccomodation)
    } else {
      next(new ErrorResponse("ID was not found", 404))
    }
  } catch (error) {
    next(error);
  }
});

accomorouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const newAccomodation = await AccomodationModel.findByIdAndDelete(id)
    res.status(204).send()
  } catch (error) {
    next(error);
  }
});

export default accomorouter;