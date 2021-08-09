import express from 'express';
import Vaccination from '../models/vaccination';
import boom from '@hapi/boom';
import parseQueryDate from '../utils/parseQueryDate';
import { DateTime } from 'luxon';

const vaccinationRouter = express.Router();

vaccinationRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const vaccination = await Vaccination.findOne({ 'vaccination-id': id });
  if (vaccination) {
    return response.status(200).json(vaccination.toJSON());
  }
  throw boom.notFound(`Vaccination by the id of ${id} not found`);
});

vaccinationRouter.get('/', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  if (!date) {
    throw boom.badRequest('date missing or invalid (yyyy-MM-dd)');
  }

  const startDate = DateTime.utc(...date);
  const endDate = startDate.endOf('day');

  //how many vaccinations have been used
  const vaccinations = await Vaccination.find({
    vaccinationDate: {
      $gte: new Date(startDate.toISO()),
      $lte: new Date(endDate.toISO()),
    }
  });

  response.status(200).json({ used: vaccinations.length });

});

export default vaccinationRouter;