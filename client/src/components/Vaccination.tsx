import React from 'react';
import useFetch from '../utils/useFetch';

type VaccinationData = {
  used: number;
  usable: number;
};

const Vaccination = ({ date }: { date: string }) => {
  const { data, error } = useFetch<VaccinationData>(`/api/vaccinations/?date=${date}`);

  if (error) return <p>eroror</p>;
  if (!data) return <p>loading</p>;
  return (
    <div style={{ border: '1px solid black', margin: '1em' }}>
      <p>{data.used}</p>
      <p>{data.usable}</p>
    </div>
  );
};

export default Vaccination;