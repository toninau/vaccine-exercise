import React, { useState } from 'react';

import DatePicker from './components/DatePicker';
import Total from './components/Total';
import Vaccination from './components/Vaccination';

const App = () => {
  const [currentDate, setCurrentDate] = useState('2021-04-12T11:10:06');

  return (
    <div>
      <p>{currentDate}</p>
      <DatePicker currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <Total date={currentDate} />
      <Vaccination date={currentDate} />
    </div>
  );
};

export default App;