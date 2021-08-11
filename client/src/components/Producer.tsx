import React from 'react';
import useFetch from '../utils/useFetch';

type ProducerData = {
  vaccine: string;
  bottles: number;
  injectionsInBottles: number;
};

const Producer = ({ date }: { date: string }) => {
  const { data, error } = useFetch<ProducerData[]>(`/api/orders/producer?date=${date}`);

  if (error) return <p>eroror</p>;
  if (!data) return <p>loading</p>;
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Producer;