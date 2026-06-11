export function isSameMonth(dateString, selectedMonth) {
  return dateString.slice(0, 7) === selectedMonth;
}

export function getMonthlyTransactions(transactions, selectedMonth) {
  return transactions.filter(tx => isSameMonth(tx.date, selectedMonth));
}

export function getMonthlyIncome(transactions, selectedMonth) {
  return getMonthlyTransactions(transactions, selectedMonth)
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
}

export function getMonthlyExpense(transactions, selectedMonth) {
  return getMonthlyTransactions(transactions, selectedMonth)
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
}

export function getCategorySummary(transactions, selectedMonth) {
  const monthlyExpenses = getMonthlyTransactions(transactions, selectedMonth)
    .filter(tx => tx.type === 'expense');

  const result = {};

  monthlyExpenses.forEach(tx => {
    if (!result[tx.category]) {
      result[tx.category] = 0;
    }

    result[tx.category] += Number(tx.amount);
  });

  return Object.entries(result)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
}