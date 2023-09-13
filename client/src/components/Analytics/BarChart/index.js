import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Store } from '../../../utils/store';
import calculate from './calculate';
import * as constants from '../../../constants';

const BarComponent = () => {
  // initialize store
  const store = Store.useContainer();
  const transactions = store.transactions;

  // time frame state
  const [timeFrame, setTimeFrame] = useState(constants.barTimeFrames[0].value); // default value set to weekly
  const [source, setSource] = useState([]);

  // calculate data when transactions or timeframe changes
  useEffect(() => {
    setSource(calculate(transactions, timeFrame));
  }, [transactions, timeFrame]);

  return (
    <>
      {/* select time frame for bar chart */}
      <Box sx={BoxStyles}>
        <FormControl size="small" fullWidth>
          <InputLabel>Timeframe</InputLabel>
          <Select
            sx={{ width: '150px' }}
            label="Timeframe"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            {constants.barTimeFrames.map((timeFrame) => (
              <MenuItem value={timeFrame.value} key={timeFrame.value}>
                {timeFrame.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Render BarChart */}
      <BarChart source={source} />
    </>
  );
};

export default BarComponent;

const BoxStyles = {
  position: 'absolute',
  right: '20px',
  zIndex: '10',
};
