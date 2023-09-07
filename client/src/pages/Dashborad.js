import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import { Store } from '../utils/store';
import Category from '../APIs/category';

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
    </>
  );
};

export default Dashboard;
