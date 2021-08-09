import React from 'react';
import Orders from './components/Orders';

const App = () => {
  return (
    <div>
      <p>init</p>
      <Orders test={'string'} />
    </div>
  );
};

export default App;