import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import React from 'react'

export const ColumnChart = () => {
  const data = [
    {
      type: 'Первый',
      sales: 38,
    },
    {
      type: 'Второй',
      sales: 52,
    },
    {
      type: 'Третий',
      sales: 61,
    },
    {
      type: 'Четвертый',
      sales: 145,
    },
    {
      type: 'Пятый',
      sales: 48,
    }
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return (
    <>
      <Column {...config} />
    </>
  )
}
