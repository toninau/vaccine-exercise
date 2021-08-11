import React, { useState } from 'react';

interface DatePickerProps {
  currentDate: string;
  setCurrentDate: (date: string) => void;
}

const DatePicker = ({ currentDate, setCurrentDate }: DatePickerProps) => {
  const [dateInput, setDateInput] = useState(currentDate);

  const dateChanger = (date: string | null) => {
    if (date) {
      setDateInput(date);
    }
  };

  return (
    <input value={dateInput}
      type="datetime-local"
      onChange={({ target }) => dateChanger(target.value)}
      onBlur={() => setCurrentDate(dateInput)}
    />
  );
};

export default DatePicker;