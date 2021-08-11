import React from 'react';
import useAxios from '../utils/useAxios';

type Vaccination = {
  used: number;
  usable: number;
};

const Total = ({ date }: {date: string}) => {
  const data = useAxios<Vaccination>(`/api/vaccinations/?date=${date}`);

  if (!data) return <p>loading</p>;
  return (
    <div>{JSON.stringify(data)}</div>
  );
};

export default Total;