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
  const endDate = DateTime.utc(...date);
  const startDate = endDate.startOf('day');

  const usedCount = await vaccinationsService
    .usedVaccinationCount(new Date(startDate.toISO()), new Date(endDate.toISO()));

  response.status(200).json({ used: usedCount });
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