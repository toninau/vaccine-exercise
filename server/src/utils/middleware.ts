import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

const unkownEndpoint = (_request: Request, _response: Response, next: NextFunction) => {
  return next(boom.notFound('unknown endpoint'));
};

const errorHandler = (err: Error, _request: Request, response: Response, next: NextFunction) => {
  const { statusCode, message } = boom.boomify(err).output.payload;

  if (statusCode >= 500) {
    return next(err);
  }
  return response.status(statusCode).json({ message });

};

export default {
  unkownEndpoint,
  errorHandler
};