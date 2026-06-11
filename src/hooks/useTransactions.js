import { useLocalStorage } from './useLocalStorage';

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage(
    'expense_transactions',
    []
  );

  function addTransaction(data) {
    const newTransaction = {
      id: crypto.randomUUID(),
      type: data.type,
      date: data.date,
      amount: Number(data.amount),
      category: data.category,
      note: data.note || '',
      paymentMethod: data.paymentMethod || '',
      createdAt: new Date().toISOString(),
    };

    setTransactions(prev => [newTransaction, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(item => item.id !== id));
  }

  function updateTransaction(id, updatedData) {
    setTransactions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  }

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
}