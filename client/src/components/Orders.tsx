import React from 'react';

interface OrdersProps {
  test: string;
}

const Orders = ({ test }: OrdersProps) => {
  return (
    <div>{test}</div>
  );
};

export default Orders;