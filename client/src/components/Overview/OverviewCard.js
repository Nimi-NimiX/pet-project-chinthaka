import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function OverviewCard({ title, amount, editable = false }) {
  return (
    <Box sx={boxStyles}>
      <Typography
        sx={{ position: 'absolute', left: '1rem', top: '.5rem' }}
        variant="h5"
        fontWeight={700}
      >
        {title}
      </Typography>

      {/* Only show edit button if editable is passed */}
      {editable && (
        <Button
          sx={{ position: 'absolute', left: '1rem', bottom: '1rem' }}
          variant="outlined"
          size="small"
          color="inherit"
        >
          Edit
        </Button>
      )}

      <Typography
        sx={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
        variant="h4"
        fontWeight={600}
        align="right"
      >
        {Number(amount).toLocaleString()}
      </Typography>
    </Box>
  );
}

export default OverviewCard;

const boxStyles = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  backgroundColor: '#fff',
  width: '23.5%',
  minWidth: '200px',
  borderRadius: '8px',
  height: '100px',
  padding: '1rem',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
};
