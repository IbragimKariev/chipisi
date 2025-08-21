import { Rose } from '@ant-design/charts';
import React from 'react';

export const RoseChart = () => {
  const data = [
    {
      type: 'Категория 1',
      value: 27,
    },
    {
      type: 'Категория 2',
      value: 25,
    },
    {
      type: 'Категория 3',
      value: 18,
    },
    {
      type: 'Категория 4',
      value: 15,
    },

  ];
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,

  };
  return (
    <>
      <Rose {...config} />
    </>
  );
};
