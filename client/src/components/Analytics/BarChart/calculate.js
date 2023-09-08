import types from '../../../constants/type';

export default function calculate(transactions, timeframe) {
  const data = [];

  // sort array by dates
  let sorted = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // for daily income and expense
  if (timeframe === 'daily') {
    // loop by 1 until 31
    for (let day = 1; day <= 31; day++) {
      let dailyIncome = 0;
      let dailyExpense = 0;

      for (let transaction of sorted) {
        // get date of the transaction
        const date = new Date(transaction.date).getDate();

        if (date === day) {
          if (transaction.type === types.INCOME) {
            dailyIncome += transaction.amount;
          } else {
            dailyExpense += transaction.amount;
          }
        }
      }

      data.push({
        Frame: `Day ${day}`,
        Income: dailyIncome,
        Expense: dailyExpense,
      });
    }
  }
  // for weekly income and expense
  else {
    // loop by 7 until 28
    for (let day = 7; day <= 28; day += 7) {
      // initial values for weeks
      let weekNum = day / 7;
      let weekIncome = 0;
      let weekExpense = 0;

      // loop each transaction of sorted array
      for (let transaction of sorted) {
        // get date of the transaction
        const date = new Date(transaction.date).getDate();

        // if transaction is inside that week, calculate the values
        if (day >= date && day < date + 7) {
          if (transaction.type === types.INCOME) {
            weekIncome += transaction.amount;
          } else {
            weekExpense += transaction.amount;
          }
        }
      }

      data.push({
        Frame: `Week ${weekNum}`,
        Income: weekIncome,
        Expense: weekExpense,
      });
    }
  }

  return data;
}
