import { useState } from 'react';
import { createContainer } from 'unstated-next';
import Type from '../constants/type';

function useStore() {
  const [budget, setBudget] = useState({});
  const [month, setMonth] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // this function adds transaction to existing list
  function addTransaction(transaction) {
    const newTransaction = [...transactions, transaction];
    setTransactions(newTransaction);
    setBudget(reCalculateBudget(newTransaction, budget));
  }

  // this function edits transaction in existing list
  function editTransaction(transaction) {
    console.log(transaction);
    const newTransactions = [...transactions];
    const index = newTransactions.findIndex((t) => t.id === transaction.id);
    newTransactions[index].amount = Number(transaction.amount); // TODO : fix returning values type from backend
    newTransactions[index].remarks = transaction.remarks;
    newTransactions[index].categoryId = Number(transaction.categoryId); // TODO : fix returning values type from backend
    setTransactions(newTransactions);
    setBudget(reCalculateBudget(newTransactions, budget));
  }

  // this function deletes transaction from existing list
  function deleteTransaction(id) {
    const newTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(newTransactions);
    setBudget(reCalculateBudget(newTransactions, budget));
  }

  return {
    month,
    setMonth,
    budget,
    setBudget,
    categories,
    setCategories,
    transactions,
    addTransaction,
    setTransactions,
    editTransaction,
    deleteTransaction,
  };
}

let Store = createContainer(useStore);

export { Store };

// this function takes in a list of transactions and calculate the budget then return the new budget
function reCalculateBudget(newTransaction, budget) {
  let totalIncome = 0;
  let totalExpense = 0;

  newTransaction.forEach((transaction) => {
    if (transaction.type === Type.INCOME) {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  budget.income = totalIncome;
  budget.expense = totalExpense;
  budget.balance = totalIncome - totalExpense;

  return budget;
}
