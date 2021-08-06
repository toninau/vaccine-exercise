import { Request, Response } from 'express';

const unkownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint'});
};

export default {
  unkownEndpoint
};