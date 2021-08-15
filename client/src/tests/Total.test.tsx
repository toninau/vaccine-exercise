//https://testing-library.com/docs/react-testing-library/example-intro
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor, screen } from '@testing-library/react';
//import { prettyDOM } from '@testing-library/dom';

import Total from '../components/Total';

const server = setupServer(
  // capture "GET /api/orders/total" requests
  rest.get('/api/orders/total', (req, res, ctx) => {
    // respond using a mocked JSON body
    const date = req.url.searchParams.get('date');
    if (date) {
      return res(ctx.json({ bottles: 20, injectionsInBottles: 60 }));
    }
    return res(ctx.status(404));
  }),
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

describe('Total', () => {

  test('displays orders and vaccinations after fetch is done', async () => {
    const { container } = render(
      <Total date={'2021-03-20T12:12'} />
    );
    await waitFor(() => screen.getByText('Total amount of orders and vaccinations'));

    const orders = container.querySelector('#orders');
    const vaccinations = container.querySelector('#vaccinations');
    expect(orders).toHaveTextContent('20');
    expect(vaccinations).toHaveTextContent('60');
  });

  test('displays error when request fails', async () => {
    const { container } = render(
      <Total date={''} />
    );
    await waitFor(() => screen.getByText('Error'));

    expect(container).toHaveTextContent(
      'Could not fetch total amount of orders and vaccinations'
    );
  });

  test('displays skeleton loader when fetching data', () => {
    const { container } = render(
      <Total date={'2021-03-20T12:12'} />
    );

    const result = container.querySelector('#loader');
    expect(result).toBeDefined();
  });

});

afterAll(() => server.close());