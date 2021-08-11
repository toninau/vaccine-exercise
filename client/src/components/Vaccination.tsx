import React from 'react';
import useFetch from '../utils/useFetch';

type Vaccination = {
  used: number;
  usable: number;
};

const Total = ({ date }: { date: string }) => {
  const { data, error } = useFetch<Vaccination>(`/api/vaccinations/?date=${date}`);

  if (error) return <p>eroror</p>;
  if (!data) return <p>loading</p>;
  return (
    <div>{JSON.stringify(data)}</div>
  );
};

export default Total;