import React, { useState } from 'react';

import Orders from './components/Orders';
import DatePicker from './components/DatePicker';

const App = () => {
  const [currentDate, setCurrentDate] = useState('2021-04-12T11:10:06');

  return (
    <div>
      <p>{currentDate}</p>
      <DatePicker currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <Orders test={'string'} />
    </div>
  );
};

export default App;