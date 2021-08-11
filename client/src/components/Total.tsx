import React, { useState, useEffect } from 'react';
import axios from 'axios';

type OrderTotal = {
  bottles: number;
  injectionsInBottles: number;
};

const Total = ({ date }: { date: string }) => {
  const [data, setData] = useState<OrderTotal | null>(null);

  // custom hook {data, loading, error}
  useEffect(() => {
    setData(null);
    const fun = async () => {
      const test = await axios.get<OrderTotal>(`/api/orders/total?date=${date}`);
      setData(test.data);
    };
    void fun();
  }, [date]);


  if (!data) return <p>loading</p>;
  return (
    <div style={{ border: '1px solid black', margin: '1em' }}>
      <p>How many orders and vaccines have arrived total?</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Total;