import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ source }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    window.addEventListener('resize', function () {
      myChart.resize();
    });

    const option = {
      title: {
        text: 'Income vs Expense',
        left: 'left',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'bottom',
      },
      tooltip: {},
      dataset: {
        dimensions: ['Frame', 'Income', 'Expense'],
        source: source,
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }],
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [source]);

  return <div ref={chartRef} style={{ height: '400px' }} />;
};

export default BarChart;
