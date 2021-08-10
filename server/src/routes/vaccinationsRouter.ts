import express from 'express';
import Vaccination from '../models/vaccination';
import boom from '@hapi/boom';
import parseQueryDate from '../utils/parseQueryDate';
import { DateTime } from 'luxon';
import vaccinationsService from '../services/vaccinationsService';

const vaccinationRouter = express.Router();

//how many vaccinations have been used?
vaccinationRouter.get('/', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  if (!date) {
    throw boom.badRequest('date missing or invalid (yyyy-MM-dd)');
  }

  const startDate = DateTime.utc(...date);
  const endDate = startDate.endOf('day');

  const vaccinations = await Vaccination.countDocuments({
    vaccinationDate: {
      $gte: new Date(startDate.toISO()),
      $lte: new Date(endDate.toISO()),
    }
  });

  response.status(200).json({ used: vaccinations });
});

//How many vaccines are going to expire in the next 10 days?
vaccinationRouter.get('/expired10', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  if (!date) {
    throw boom.badRequest('date missing or invalid (yyyy-MM-dd)');
  }

  const startDate = DateTime.utc(...date).plus({ days: -30 });
  const endDate = startDate.plus({ days: 10 });

  const expired10 = await vaccinationsService.expired10(new Date(startDate.toISO()), new Date(endDate.toISO()));

  response.status(200).json(expired10);

});

vaccinationRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const vaccination = await Vaccination.findOne({ 'vaccination-id': id });
  if (vaccination) {
    return response.status(200).json(vaccination.toJSON());
  }
  throw boom.notFound(`Vaccination by the id of ${id} not found`);
});

export default vaccinationRouter;