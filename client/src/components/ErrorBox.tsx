import React from 'react';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const ErrorBox = ({ text }: { text: string }) => {
  return (
    <Alert severity="error" style={{ height: '100%' }}>
      <AlertTitle>Error</AlertTitle>
      {text}
    </Alert>
  );
};

export default ErrorBox;