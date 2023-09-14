import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip, Typography } from '@mui/material';
import { Store } from '../../utils/store';
import { Box } from '@mui/system';
import types from '../../constants/type';
import EditModel from './EditModel';
import transaction from '../../APIs/transaction';

const TransactionsTable = ({ transactions, Categories }) => {
  // Get the transactions and categories from the store
  const store = Store.useContainer();

  // states for editModel
  const [open, setOpen] = useState(false);
  const [editModelData, setEditModelData] = useState({});
  const handleClose = () => {
    setOpen(false);
    setEditModelData({});
  };

  // delete transaction
  const handleDelete = (id) => {
    transaction.delete(id).then((res) => {
      if (res) {
        store.deleteTransaction(id);
      }
    });
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Typography>{Number(params.value).toLocaleString()}</Typography>
          </>
        );
      },
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: (params) => {
        // render type according to the value with colors
        if (params.value === types.EXPENSE) {
          return (
            <Chip label="Expense" color="error" size="small" variant="filled" />
          );
        } else {
          return (
            <Chip
              label="Income"
              color="success"
              size="small"
              variant="filled"
            />
          );
        }
      },
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      flex: 1,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: 'categoryId',
      headerName: 'Category',
      sortable: false,
      flex: 1,
      // render category name according to the categoryId
      valueFormatter: (params) => {
        const category = Categories.find(
          (category) => category.id === Number(params.value)
        );
        return category?.categoryName;
      },
    },
    {
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      // render edit and delete buttons for each row
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={() => {
                  setEditModelData(params.row);
                  setOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </Button>
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <>
      <DataGrid
        rows={transactions || []}
        columns={columns}
        initialState={{ pageSize: 50, page: 0 }}
        pageSizeOptions={[50, 100, 200]}
      />

      {/* render editModel if open is true */}
      <EditModel
        open={open}
        handleClose={handleClose}
        transaction={editModelData}
      />

      {/* Snackbar to show success/error message */}
    </>
  );
};

export default TransactionsTable;
