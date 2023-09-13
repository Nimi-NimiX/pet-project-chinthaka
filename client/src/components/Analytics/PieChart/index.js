import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import calculate from './calculate';
import { Store } from '../../../utils/store';
import { pieTimeFrames } from '../../../constants';

function PieComponent() {
  // initialize store
  const store = Store.useContainer();

  // get data from store
  const transactions = store.transactions;
  const categories = store.categories;

  // set data for chart
  const [data, setData] = useState([]);
  const [timeFrame, setTimeFrame] = useState(pieTimeFrames[0].value); // default value set to monthly

  // calculate chart when transactions changes
  useEffect(() => {
    setData(calculate(transactions, categories, timeFrame));
  }, [transactions, categories, timeFrame]);

  return (
    <>
      {/* select time frame for pie chart */}
      <Box sx={BoxStyles}>
        <FormControl size="small" fullWidth>
          <InputLabel>Timeframe</InputLabel>
          <Select
            sx={{ width: '150px' }}
            label="Timeframe"
            defaultValue=""
            onChange={(e) => setTimeFrame(e.target.value)}
            value={timeFrame}
          >
            {pieTimeFrames.map((timeFrame) => (
              <MenuItem key={timeFrame.value} value={timeFrame.value}>
                {timeFrame.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* render pie chart */}
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
