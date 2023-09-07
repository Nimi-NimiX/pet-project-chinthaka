import { Button, Modal, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Store } from '../../utils/store';
import Budget from '../../APIs/budget';
import * as constants from '../../constants';

const SetBudgetModel = ({ open, handleClose }) => {
  // state of form data
  const [adding, setAdding] = useState(false);

  // initialize store
  const store = Store.useContainer();
  const month = store.month.getMonth();
  const year = store.month.getFullYear();

  // get month name from month number
  const monthName = constants.monthName[month];

  // estimated budget state with default value from store
  const [estimatedBudget, setEstimatedBudget] = useState(
    store.budget?.estimatedBudget || 0
  );

  // set budget API call
  const setBudget = async (id, budget) => {
    try {
      setAdding(true);
      const data = await Budget.set(id, budget);
      if (data) {
        store.setBudget(data.budget);
      }
      setAdding(false);
      handleClose();
    } catch (error) {}
  };

  // reset estimated budget on model close
  useEffect(() => {
    setEstimatedBudget(store.budget?.estimatedBudget || 0);

    return () => {};
  }, [open]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={MainBoxStyles}>
          <Typography variant="h6" component="h2">
            Set Estimated Budget for {monthName} {year}
          </Typography>

          <form
            autoComplete="off"
            style={formStyles}
            onSubmit={(e) => {
              e.preventDefault();
              setBudget(store.budget.id, estimatedBudget);
            }}
          >
            <TextField
              required
              size="small"
              label="Budget"
              variant="outlined"
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
              type="number"
            />
            <Box sx={ButtonGroup}>
              <Button onClick={handleClose} color="error" variant="contained">
                Cancel
              </Button>
              <LoadingButton
                loading={adding}
                variant="contained"
                color="success"
                type="submit"
              >
                Save
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SetBudgetModel;

const MainBoxStyles = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '5px',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const formStyles = {
  marginTop: '20px',
  display: 'flex',
  gap: '20px',
  flexDirection: 'column',
  alignItems: 'center',
};

const ButtonGroup = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
};
