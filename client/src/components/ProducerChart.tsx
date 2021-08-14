import React from 'react';

import useFetch from '../utils/useFetch';
import ErrorBox from './ErrorBox';
import SkeletonLoader from './SkeletonLoader';

import {
  Box,
  Paper,
  Typography,
  Toolbar,
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions, ChartData } from 'chart.js';

type ProducerData = {
  vaccine: string;
  bottles: number;
  injectionsInBottles: number;
};

const ProducerChart = ({ date }: { date: string }) => {
  const { data, error } = useFetch<ProducerData[]>(`/api/orders/producer?date=${date}`);

  if (error) return <ErrorBox text={'Could not fetch orders and vaccines per producer'} />;
  if (!data) return <SkeletonLoader height={300} />;

  const chartData: ChartData = {
    labels: data.map((producerData) => producerData.vaccine),
    datasets: [
      {
        label: '# of bottles',
        data: data.map((producerData) => producerData.bottles),
        backgroundColor: '#827191'
      },
      {
        label: '# of injections',
        data: data.map((producerData) => producerData.injectionsInBottles),
        backgroundColor: '#7D1D3F'
      }
    ]
  };


  const options: ChartOptions = {
    scales: {
      xAxes: {
        grid: {
          color: 'rgba(81, 81, 81, 1)',
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#fff',
        }
      },
      yAxes: {
        grid: {
          color: 'rgba(81, 81, 81, 1)',
          borderColor: 'rgba(81, 81, 81, 1)',
          borderWidth: 2,
          lineWidth: 2,
        },
        ticks: {
          color: '#fff',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
        }
      }
    }
  };

  return (
    <Box component={Paper} p={2}>
      <Toolbar disableGutters>
        <Typography variant="h5" color="primary">
          Orders and vaccines arrived per producer
        </Typography>
      </Toolbar>
      {data.length ?
        <Bar data={chartData} options={options} /> :
        <Typography variant="h6" align="center">
          Nothing to show
        </Typography>
      }
    </Box>
  );
};

export default ProducerChart;