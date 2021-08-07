import express from 'express';
import Vaccination from '../models/vaccination';
import boom from '@hapi/boom';

const vaccinationRouter = express.Router();

vaccinationRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const vaccination = await Vaccination.findOne({'vaccination-id': id});
  if (vaccination) {
    return response.status(200).json(vaccination.toJSON());
  }
  throw boom.notFound(`Vaccination by the id of ${id} not found`);
});

export default vaccinationRouter;