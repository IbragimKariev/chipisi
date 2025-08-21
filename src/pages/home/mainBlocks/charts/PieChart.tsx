import { Pie } from '@ant-design/charts';
import React from 'react'

export const PieChart = () => {
  const currentTheme = 'light';
  const data = [
    {
      type: 'Первый',
      value: 27,
    },
    {
      type: 'Второй',
      value: 25,
    },
    {
      type: 'Третий',
      value: 18,
    },
    {
      type: 'четвертый',
      value: 15,
    },
    {
      type: 'Пятый',
      value: 10,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'type',
      labelHeight: 28,
      content: '{name}\n{percentage}',
      style: {fill : currentTheme === "light" ? "#000" : "#fff"}
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <>
    <Pie {...config} />
    </>
  )
}
