import React from 'react';

import useFetch from '../hooks/useFetch';
import { ExpiredOrder } from '../types';
import SkeletonLoader from './SkeletonLoader';
import ErrorBox from './ErrorBox';

import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Toolbar,
  TableContainer
} from '@material-ui/core';

interface ExpiredProps {
  date: string;
  url: string;
  headerRows: string[];
  infoText: string;
}

const Expired = ({ date, url, headerRows, infoText }: ExpiredProps) => {
  const { data, error } = useFetch<ExpiredOrder[]>(`${url}?date=${date}`);

  if (error) return <ErrorBox text={'Could not fetch expiration data'} />;
  if (!data) return <SkeletonLoader height={300} />;
  return (
    <Box component={Paper} p={2}>
      <Toolbar disableGutters>
        <Typography variant="h5" color="primary">
          {infoText}
        </Typography>
      </Toolbar>
      {data.length ?
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headerRows.map((value) => (
                  <TableCell key={value}>{value}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((value) => (
                <TableRow key={value.vaccine}>
                  <TableCell>{value.vaccine}</TableCell>
                  <TableCell>{value.expiredBottles}</TableCell>
                  <TableCell>{value.expiredInjections}</TableCell>
                  <TableCell>{value.usedInjections}</TableCell>
                  <TableCell>{value.injectionsInBottles}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{data.reduce((a, b) => a + b.expiredBottles, 0)}</TableCell>
                <TableCell>{data.reduce((a, b) => a + b.expiredInjections, 0)}</TableCell>
                <TableCell>{data.reduce((a, b) => a + b.usedInjections, 0)}</TableCell>
                <TableCell>{data.reduce((a, b) => a + b.injectionsInBottles, 0)}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer> :
        <Typography variant="h6" align="center">
          Nothing to show
        </Typography>
      }
    </Box>
  );
};

export default Expired;