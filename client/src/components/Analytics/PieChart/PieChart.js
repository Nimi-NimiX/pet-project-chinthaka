import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    window.addEventListener('resize', function () {
      myChart.resize();
    });

    const option = {
      title: {
        text: 'Expense by Category',
        left: 'left',
      },
      tooltip: {},
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'bottom',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ height: '400px' }} />;
};

export default PieChart;
