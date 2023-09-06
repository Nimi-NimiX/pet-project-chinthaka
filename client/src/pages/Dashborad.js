import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import { Store } from '../utils/store';
import Category from '../APIs/category';

const Dashboard = () => {
  const store = Store.useContainer();

  // Get categories when component mounts and set store
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await Category.get();
        store.setCategories(data.categories);
      } catch (error) {}
    };

    getCategories();

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
