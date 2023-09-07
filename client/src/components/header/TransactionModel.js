import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Store } from '../../utils/store';
import Transactions from '../../APIs/transaction';
import Type from '../../constants/type';
import LoadingButton from '@mui/lab/LoadingButton';

function AddTransaction() {
  // Get store values
  const store = Store.useContainer();

  // states for modal and form
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(Type.INCOME);
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [adding, setAdding] = useState(false);

  const handleOpen = () => setOpen(true);

  // Reset form values on close
  const handleClose = () => {
    setOpen(false);
    setType('I');
    setCategory('');
    setSelectedDate(new Date());
  };

  // Add transaction API call
  const addTransaction = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.date = selectedDate;
    data.budgetId = store.budget.id;

    setAdding(true);
    Transactions.add(data).then((res) => {
      if (res) {
        // If transaction is added, update store
        store.addTransaction(res.transaction);
        setAdding(false);
      } else {
        setAdding(false);
      }
    });
  };

  const disbaleMonths = (date) => {
    return date.getMonth() !== store.month.getMonth();
  };

  return (
    <>
      {/* Add Transaction Button */}
      <Box sx={{ position: 'absolute', right: '20px' }}>
        <Button variant="contained" color="inherit" onClick={handleOpen}>
          <AddIcon />
          Add Transaction
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={MainBoxStyles}>
          <Typography variant="h6" component="h2">
            Add Transaction
          </Typography>

          <form autoComplete="off" onSubmit={addTransaction} style={FormStyles}>
            <RadioGroup
              row
              name="type"
              defaultValue={Type.INCOME}
              onChange={(e) => {
                // Reset category on type change
                setType(e.target.value);
                setCategory('');
              }}
              value={type}
              required
            >
              <FormControlLabel
                value={Type.INCOME}
                control={<Radio color="success" />}
                label="Income"
              />
              <FormControlLabel
                value={Type.EXPENSE}
                control={<Radio color="error" />}
                label="Expense"
              />
            </RadioGroup>
            <TextField
              fullWidth
              required
              size="small"
              placeholder="Amount"
              type="number"
              name="amount"
            />
            <TextField
              fullWidth
              required
              size="small"
              placeholder="Remarks"
              type="text"
              name="remarks"
            />

            <FormControl size="small" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="categoryId"
                defaultValue=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {/* Filter categories based on type */}
                {store.categories
                  .filter((category) => category.categoryType === type)
                  .map((category) => (
                    <MenuItem value={category.id} key={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Transaction Date"
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  disableFuture={true}
                  // Disable dates from other months
                  shouldDisableMonth={disbaleMonths}
                />
              </LocalizationProvider>
            </FormControl>

            <Box sx={ButtonsBoxStyles}>
              <LoadingButton
                loading={adding}
                variant="contained"
                color="success"
                type="submit"
              >
                Add
              </LoadingButton>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

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
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const FormStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '10px',
};

const ButtonsBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
};

export default AddTransaction;
