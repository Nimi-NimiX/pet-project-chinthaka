import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Store } from '../../utils/store';
import { Typography } from '@mui/material';
import Budget from '../../APIs/budget';
import AddTransaction from './TransactoinModel';
import * as constants from '../../constants';

function Navbar() {
  const store = Store.useContainer();

  const month = store.month.getMonth();
  const year = store.month.getFullYear();
  const monthName = constants.monthName[month];

  useEffect(() => {
    try {
      const res = Budget.get(`${month}${year}`);
      res.then((data) => {
        store.setTransactions(data.budget?.Transactions || []);
        store.setBudget(data.budget);
      });
    } catch (error) {}

    return () => {
      store.setTransactions([]);
      store.setBudget({});
    };
  }, [month, year]);

  return (
    <>
      <StyledBox>
        <Typography
          component="div"
          variant="h6"
          fontWeight={700}
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          Monthly Overview for {monthName} {year}
        </Typography>

        {/* 
        Add transaction button with modal
        */}
        <AddTransaction />

        {/*
        Month picker 
        */}
        <Box
          sx={{
            position: 'absolute',
            left: '20px',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['year', 'month']}
              label="Select a month"
              maxDate={new Date()}
              slotProps={{ textField: { size: 'small', variant: 'standard' } }}
              value={store.month}
              onChange={store.setMonth}
            />
          </LocalizationProvider>
        </Box>
      </StyledBox>
    </>
  );
}

const StyledBox = styled(Box)`
  background-color: #d9d9d9;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px 0 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

export default Navbar;
