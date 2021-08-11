import React from 'react';
import useFetch from '../utils/useFetch';
import { ExpiredOrder } from '../types';

const ExpiringIn10Days = ({ date }: { date: string }) => {
  const { data, error } = useFetch<ExpiredOrder[]>(`/api/orders/expiring10d?date=${date}`);

  if (error) return <p>eroror</p>;
  if (!data) return <p>loading</p>;
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default ExpiringIn10Days;