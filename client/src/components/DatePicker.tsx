import React, { useState } from 'react';
import { Box, Paper, TextField } from '@material-ui/core';

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
    <Box component={Paper} display="flex" justifyContent="center" p={2}>
      <TextField
        id="date"
        label="Select a date"
        type="datetime-local"
        value={dateInput}
        onChange={({ target }) => dateChanger(target.value)}
        onBlur={() => setCurrentDate(dateInput)}
      />
    </Box>
  );
};

export default DatePicker;