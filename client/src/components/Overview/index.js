import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Store } from '../../utils/store';
import OverviewCard from './OverviewCard';
import SetBudgetModel from './SetBudgetModel';

const Overiew = () => {
  // initialize store
  const store = Store.useContainer();

  // states and handlers for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          onEdit={() => handleOpen()}
        />
      </Box>
      {/* Modal for setting budget */}
      <SetBudgetModel open={open} handleClose={handleClose} />
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
