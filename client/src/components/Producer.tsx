import React from 'react';

import useFetch from '../utils/useFetch';
import ErrorBox from './ErrorBox';
import SkeletonLoader from './SkeletonLoader';

import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Toolbar
} from '@material-ui/core';

type ProducerData = {
  vaccine: string;
  bottles: number;
  injectionsInBottles: number;
};

const Producer = ({ date }: { date: string }) => {
  const { data, error } = useFetch<ProducerData[]>(`/api/orders/producer?date=${date}`);

  if (error) return <ErrorBox text={'Could not fetch orders and vaccines per producer'} />;
  if (!data) return <SkeletonLoader height={300} />;
  return (
    <Box component={Paper}>
      <Toolbar>
        <Typography variant="h5" color="primary">
          Orders and vaccines arrived per producer
        </Typography>
      </Toolbar>
      {data.length ?
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producers</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Vaccines</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value) => (
              <TableRow key={value.vaccine}>
                <TableCell>{value.vaccine}</TableCell>
                <TableCell>{value.bottles}</TableCell>
                <TableCell>{value.injectionsInBottles}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{data.reduce((a, b) => a + b.bottles, 0)}</TableCell>
              <TableCell>{data.reduce((a, b) => a + b.injectionsInBottles, 0)}</TableCell>
            </TableRow>
          </TableHead>
        </Table> :
        <Typography variant="h6" align="center">
          Nothing to show
        </Typography>
      }
    </Box>
  );
};

export default Producer;