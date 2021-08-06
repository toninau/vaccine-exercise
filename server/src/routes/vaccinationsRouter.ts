import express from 'express';
import Vaccination from '../models/vaccination';

const vaccinationRouter = express.Router();

vaccinationRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const vaccination = await Vaccination.findOne({'vaccination-id': id});
  if (vaccination) {
    response.status(200).json(vaccination.toJSON());
  } else {
    response.status(404).json({ error: 'not found' });
  }
});

export default vaccinationRouter;