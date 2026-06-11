import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import {
  getMonthlyIncome,
  getMonthlyExpense,
  getCategorySummary,
} from '../utils/calculations';
import { formatMoney } from '../utils/money';

export default function Dashboard() {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { transactions } = useTransactions();

  const income = getMonthlyIncome(transactions, selectedMonth);
  const expense = getMonthlyExpense(transactions, selectedMonth);
  const saving = income - expense;
  const categories = getCategorySummary(transactions, selectedMonth);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tổng quan chi tiêu
          </h1>
          <p className="text-gray-500">
            Theo dõi thu nhập, chi tiêu và số tiền còn lại trong tháng.
          </p>
        </div>

        <input
          type="month"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="rounded-xl border px-4 py-2"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tổng thu</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {formatMoney(income)}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tổng chi</p>
          <h2 className="mt-2 text-2xl font-bold text-red-600">
            {formatMoney(expense)}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Còn lại</p>
          <h2
            className={`mt-2 text-2xl font-bold ${
              saving >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}
          >
            {formatMoney(saving)}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">
          Chi tiêu theo danh mục
        </h2>

        {categories.length === 0 ? (
          <p className="text-gray-500">
            Chưa có chi tiêu nào trong tháng này.
          </p>
        ) : (
          <div className="space-y-3">
            {categories.map(item => (
              <div key={item.category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span className="font-semibold">
                    {formatMoney(item.amount)}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{
                      width: `${Math.min(
                        (item.amount / expense) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}