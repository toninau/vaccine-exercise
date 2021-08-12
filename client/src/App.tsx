import React, { useState } from 'react';

import DatePicker from './components/DatePicker';
import Total from './components/Total';
import Vaccination from './components/Vaccination';
import Producer from './components/Producer';
import Expired from './components/Expired';
import { expiredRows, expiredIn10DaysRows } from './constants';
import { CssBaseline, Container, Grid } from '@material-ui/core';

const App = () => {
  const [currentDate, setCurrentDate] = useState('2021-04-12T11:10:06');

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" disableGutters>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DatePicker currentDate={currentDate} setCurrentDate={setCurrentDate} />
          </Grid>
          <Grid item xs={6}>
            <Total date={currentDate} />
          </Grid>
          <Grid item xs={6}>
            <Vaccination date={currentDate} />
          </Grid>
          <Grid item xs={12}>
            <Producer date={currentDate} />
          </Grid>
          <Grid item xs={12}>
            <Expired
              date={currentDate}
              url={'/api/orders/expired'}
              headerRows={expiredRows}
              infoText={'Expired bottles and injections'}
            />
          </Grid>
          <Grid item xs={12}>
            <Expired
              date={currentDate}
              url={'/api/orders/expiring10d'}
              headerRows={expiredIn10DaysRows}
              infoText={'Orders and vaccines expiring in 10 days'}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;