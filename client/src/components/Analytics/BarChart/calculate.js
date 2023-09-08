export default function calculate(transactions, timeframe) {
  if (timeframe === 'weekly') {
    const sortedTransactions = transactions.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    sortedTransactions.forEach((transaction) => {
      console.log(new Date(transaction.date).getDate());
    });

    return [];
  } else {
    return [];
  }
}
