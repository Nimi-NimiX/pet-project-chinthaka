import React from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import { Box } from '@mui/system';

function index() {
  return (
    <Box sx={Container}>
      <Box sx={boxStyles}>
        <BarChart />
      </Box>
      <Box sx={boxStyles}>
        <PieChart />
      </Box>
    </Box>
  );
}

export default index;

const boxStyles = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  width: '48.5%',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
};

const Container = {
  display: 'flex',
  flexDirection: 'col',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '30px',
};
