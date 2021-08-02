import express from 'express';
//import Order from '../models/order';

const ordersRouter = express.Router();

ordersRouter.get('/:id', (request, response) => {
  const id = request.params.id;
  response.status(200).json({id});
});

export default ordersRouter;