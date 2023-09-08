import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';
import { Store } from '../utils/store';
import Category from '../APIs/category';
import styled from '@emotion/styled';
import { Box } from '@mui/system';

const Dashboard = () => {
  const store = Store.useContainer();

  // Get categories when component mounts and set store
  useEffect(() => {
    try {
      const res = Category.get();
      res.then((data) => {
        store.setCategories(data.categories);
      });
    } catch (error) {}

    return () => {
      store.setCategories([]);
    };
  }, []);

  return (
    <>
      <Header />
      <StyledBox>
        <Overview />
        <Analytics />
      </StyledBox>
    </>
  );
};

export default Dashboard;

const StyledBox = styled(Box)`
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  gap: 20px;
  border-radius: 3px;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
