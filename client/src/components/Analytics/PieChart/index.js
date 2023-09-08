import React, { useState } from 'react';
import PieChart from './PieChart';
import { Box, FormControl, InputLabel, Select } from '@mui/material';

function PieComponent() {
  const [data, setData] = useState([
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ]);

  return (
    <>
      <Box sx={BoxStyles}>
        <FormControl size="small" fullWidth>
          <InputLabel>Timeframe</InputLabel>
          <Select
            sx={{ width: '150px' }}
            label="Timeframe"
            defaultValue=""
          ></Select>
        </FormControl>
      </Box>
      <PieChart data={data} />
    </>
  );
}

export default PieComponent;

const BoxStyles = {
  position: 'absolute',
  right: '20px',
  zIndex: '10',
};
