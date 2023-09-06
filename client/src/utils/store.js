import { useState } from 'react';
import { createContainer } from 'unstated-next';

function useStore() {
  /**
   * Set initial state and create state setter
   */

  const [budget, setBudget] = useState({});
  const [month, setMonth] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  return {
    month,
    setMonth,
    budget,
    setBudget,
    categories,
    setCategories,
    transactions,
    setTransactions,
  };
}

let Store = createContainer(useStore);

export { Store };
