import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Store } from '../../utils/store';
import transactions from '../../APIs/transaction';

const EditModel = ({ open, handleClose, transaction }) => {
  // initialize store
  const store = Store.useContainer();
  const Categories = [...store.categories] || [];

  // states for editModel
  const [isLoading, setIsLoading] = useState(false);

  // snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleEdit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    transactions.edit(transaction.id, data).then((res) => {
      if (res) {
        store.editTransaction(res.transaction);
        setIsLoading(false);
        setSnackbarOpen(true);
        handleClose();
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={MainBoxStyles}>
          {/* Title */}
          <Typography variant="h6" component="h2">
            Edit Transaction Details (ID: {transaction.id})
          </Typography>

          {/* Form to edit transaction details */}
          <form autoComplete="off" style={formStyles} onSubmit={handleEdit}>
            <TextField
              id="amount"
              name="amount"
              label="Amount"
              variant="outlined"
              type="number"
              size="small"
              defaultValue={transaction.amount}
            />
            <TextField
              id="remarks"
              name="remarks"
              label="Remarks"
              variant="outlined"
              size="small"
              defaultValue={transaction.remarks}
            />

            <FormControl size="small" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="categoryId"
                id="categoryId"
                defaultValue={transaction.categoryId}
                required
              >
                {/* Filter categories based on type */}
                {Categories.filter(
                  (category) => category.categoryType === transaction.type
                ).map((category) => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={ButtonGroup}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleClose}
              >
                Close
              </Button>
              <LoadingButton
                variant="contained"
                color="success"
                size="small"
                loading={isLoading}
                type="submit"
              >
                Save
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Snackbar to show success/error message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={snackbarClose}
      >
        <Alert severity="success" variant="filled" onClose={snackbarClose}>
          Transaction edited successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditModel;

const MainBoxStyles = {
  position: 'absolute',
  display: 'flex',
  gap: '20px',
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
