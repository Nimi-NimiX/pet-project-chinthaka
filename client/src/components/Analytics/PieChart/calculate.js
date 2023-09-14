import types from '../../../constants/type';

const pieDataCal = (transactions, categories) => {
  try {
    // filter transactions to only keep expenses
    let sorted = [...transactions].filter((transaction) => {
      return transaction.type === types.EXPENSE;
    });

    const data = [];

    // loop through each category and calculate total expense
    for (let category of categories) {
      let total = 0;

      for (let transaction of sorted) {
        if (transaction.categoryId === category.id) {
          total += transaction.amount;
        }
      }

      // only get categories with total expense with value
      if (total > 0) {
        data.push({
          name: category.categoryName,
          value: total,
        });
      }
    }
    return data;
  } catch (error) {}
};

export default pieDataCal;
