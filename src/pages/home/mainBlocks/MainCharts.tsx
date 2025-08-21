import React from 'react'
import { PieChart } from './charts/PieChart'

export const MainCharts = () => {
    return (
        <div className='mainCharts'>
            <div className="chartItem">
                <PieChart />
            </div>
            <div className="chartItem">
                <PieChart />
            </div>
            <div className="chartItem">
                <PieChart />
            </div>
        </div>
    )
}
