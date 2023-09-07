import React from 'react';
import { Box } from '@mui/system';
import { Store } from '../../utils/store';
import OverviewCard from './OverviewCard';

const Overiew = () => {
  // initialize store
  const store = Store.useContainer();

  return (
    <>
      <Box sx={styles}>
        <OverviewCard title={'Balance'} amount={store.budget?.balance || 0} />
        <OverviewCard title={'Income'} amount={store.budget?.income || 0} />
        <OverviewCard title={'Expense'} amount={store.budget?.expense || 0} />
        <OverviewCard
          title={'Estimated Budget'}
          amount={store.budget.estimatedBudget || 0}
          editable
        />
      </Box>
    </>
  );
};

export default Overiew;

const styles = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  width: '100%',
};
