import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Vaccination = {
  used: number;
  usable: number;
};

const Total = ({ date }: {date: string}) => {
  const [data, setData] = useState<Vaccination | null>(null);

  useEffect(() => {
    setData(null);
    const fun = async () => {
      const test = await axios.get<Vaccination>(`/api/vaccinations/?date=${date}`);
      setData(test.data);
    };
    void fun();
  }, [date]);


  if (!data) return <p>loading</p>;
  return (
    <div>{JSON.stringify(data)}</div>
  );
};

export default Total;