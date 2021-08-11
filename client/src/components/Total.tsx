import React from 'react';
import useAxios from '../utils/useAxios';

type OrderTotal = {
  bottles: number;
  injectionsInBottles: number;
};

const Total = ({ date }: { date: string }) => {
  const data = useAxios<OrderTotal>(`/api/orders/total?date=${date}`);

  if (!data) return <p>loading</p>;
  return (
    <div style={{ border: '1px solid black', margin: '1em' }}>
      <p>How many orders and vaccines have arrived total?</p>
      <p>{data.bottles}</p>
      <p>{data.injectionsInBottles}</p>
    </div>
  );
};

export default Total;