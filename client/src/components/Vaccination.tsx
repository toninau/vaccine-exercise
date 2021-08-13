import React from 'react';

import useFetch from '../utils/useFetch';
import SkeletonLoader from './SkeletonLoader';
import ErrorBox from './ErrorBox';

import { Box, Paper, Typography } from '@material-ui/core';

type VaccinationData = {
  used: number;
  usable: number;
};

const Vaccination = ({ date }: { date: string }) => {
  const { data, error } = useFetch<VaccinationData>(`/api/vaccinations/?date=${date}`);

  if (error) return <ErrorBox text={'Could not fetch used/usable vaccinations'} />;
  if (!data) return <SkeletonLoader height={178} />;
  return (
    <Box component={Paper} p={2} height="100%">
      <Typography variant="h5" color="primary">
        Vaccinations used and left to use
      </Typography>
      <p>vaccinations used during the day: {data.used}</p>
      <p>usable vaccinations left: {data.usable}</p>
    </Box>
  );
};

export default Vaccination;