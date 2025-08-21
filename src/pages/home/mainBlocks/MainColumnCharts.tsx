import React from 'react'
import { ColumnChart } from './charts/ColumnChart'
import { RoseChart } from './charts/RoseChart'

export const MainColumnCharts = () => {
  return (
    <div className='mainColumnCharts'>
        <div className='columnChartsItem'>  <ColumnChart /></div>     
        <div className='columnChartsItem'>  <RoseChart /></div>     

    </div>
  )
}
