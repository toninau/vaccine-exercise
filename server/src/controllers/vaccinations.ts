import express from 'express';
import Vaccination from '../models/vaccination';

const vaccinationRouter = express.Router();

vaccinationRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const vaccination = await Vaccination.findOne({'vaccination-id': id});
  response.status(200).json(vaccination);
});

export default vaccinationRouter;