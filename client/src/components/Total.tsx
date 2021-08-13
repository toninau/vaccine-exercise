import React from 'react';

import useFetch from '../utils/useFetch';
import SkeletonLoader from './SkeletonLoader';
import ErrorBox from './ErrorBox';

import { Box, Paper, Typography } from '@material-ui/core';

type TotalData = {
  bottles: number;
  injectionsInBottles: number;
};

const Total = ({ date }: { date: string }) => {
  const { data, error } = useFetch<TotalData>(`/api/orders/total?date=${date}`);

  if (error) return <ErrorBox text={'Could not fetch total amount of orders and vaccinations'} />;
  if (!data) return <SkeletonLoader height={178} />;
  return (
    <Box component={Paper} p={2} height="100%">
      <Typography variant="h5" color="primary">
        Total amount of orders and vaccinations
      </Typography>
      <p>orders: {data.bottles}</p>
      <p>vaccinations: {data.injectionsInBottles}</p>
    </Box>
  );
};

export default Total;