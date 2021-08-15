import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DatePicker from '../components/DatePicker';
//import { prettyDOM } from '@testing-library/dom';

describe('DatePicker', () => {
  test('updates parent state', () => {

    const setDate = jest.fn();

    const { container } = render(
      <DatePicker currentDate={'2021-04-12T12:00'} setCurrentDate={setDate} />
    );

    const dateInput = container.querySelector('#date');

    if (dateInput) {
      fireEvent.change(dateInput, { target: { value: '2021-02-12T12:12' } });
      fireEvent.focusOut(dateInput);
    }

    expect(setDate.mock.calls).toHaveLength(1);
    expect(setDate.mock.calls[0][0]).toBe('2021-02-12T12:12');
  });
});
