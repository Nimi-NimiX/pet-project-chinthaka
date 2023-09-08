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
  const [timeframe, setTimeframe] = useState(constants.barTimeFrames[0].value);
  const [source, setSource] = useState([]);

  // calculate data when transactions or timeframe changes
  useEffect(() => {
    setSource(calculate(transactions, timeframe));
  }, [transactions, timeframe]);

  return (
    <>
      <Box sx={BoxStyles}>
        <FormControl size="small" fullWidth>
          <InputLabel>Timeframe</InputLabel>
          <Select
            sx={{ width: '150px' }}
            label="Timeframe"
            defaultValue=""
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
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
