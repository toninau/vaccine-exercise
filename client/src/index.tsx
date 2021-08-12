import React from 'react';
import ReactDOM from 'react-dom';

import { createTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: orange[400],
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
