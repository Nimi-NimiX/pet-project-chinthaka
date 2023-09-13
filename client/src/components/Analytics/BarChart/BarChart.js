import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ source }) => {
  const chartRef = useRef(null);

  // useEffect used to render the chart on the page when data is changed
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
      color: ['#91CC75', '#EE6666'],
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
