import React from 'react';
import { Box } from '@mui/system';

const Overiew = () => {
  return (
    <>
      <Box sx={styles}>Overiew</Box>
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
