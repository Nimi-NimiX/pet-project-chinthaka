import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import TransactionsTable from './Table';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Store } from '../../utils/store';
import * as constants from '../../constants';

function Transactions() {
  const store = Store.useContainer();
  const storeTransactions = store.transactions;
  const [transactions, setTransactions] = useState(store.transactions || []);
  const Categories = store.categories || [];
  const [type, setType] = useState([]);

  useEffect(() => {
    if (type.length > 0) {
      // Filter the transactions based on the type
      const filteredTransactions = storeTransactions.filter((t) =>
        type.includes(t.type)
      );
      setTransactions(filteredTransactions);
    } else {
      setTransactions(storeTransactions);
    }
  }, [storeTransactions, type]);

  return (
    <Box sx={Container}>
      <Box sx={boxStyles}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight={700}>
            All Transactions
          </Typography>

          <ToggleButtonGroup
            color="info"
            size="small"
            value={type}
            onChange={(e, value) => setType(value)}
          >
            {constants.types.map((type) => (
              <ToggleButton
                value={type.value}
                color={type.color}
                key={type.value}
              >
                {type.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Display the TransactionsTable component */}
        <TransactionsTable
          transactions={transactions}
          Categories={Categories}
        />
      </Box>
    </Box>
  );
}

export default Transactions;

const boxStyles = {
  position: 'relative',
  display: 'flex',

  flexDirection: 'column',
  backgroundColor: '#fff',
  width: '99%',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  gap: '30px',
};

const Container = {
  display: 'flex',
  flexDirection: 'col',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
};
