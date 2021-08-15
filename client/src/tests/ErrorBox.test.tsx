import React from 'react';
import { render } from '@testing-library/react';
import ErrorBox from '../components/ErrorBox';

describe('ErrorBox', () => {
  test('renders error message', () => {
    const { container } = render(
      <ErrorBox text={'this is a error box'} />
    );
    expect(container).toHaveTextContent(
      'this is a error box'
    );
  });
});
