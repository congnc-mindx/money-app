import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { defaultSettings } from '../data/defaultSettings';

export default function AddTransaction() {
  const { addTransaction } = useTransactions();

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    type: 'expense',
    date: today,
    amount: '',
    category: 'Mua sắm',
    note: '',
    paymentMethod: '',
  });

  const categories =
    form.type === 'expense'
      ? defaultSettings.expenseCategories
      : defaultSettings.incomeSources;

  function updateField(field, value) {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.amount || Number(form.amount) <= 0) {
      alert('Nhập số tiền hợp lệ đã ông ơi.');
      return;
    }

    addTransaction(form);

    setForm({
      type: 'expense',
      date: today,
      amount: '',
      category: 'Mua sắm',
      note: '',
      paymentMethod: '',
    });

    alert('Đã lưu giao dịch.');
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-3xl font-bold">
        Thêm giao dịch
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              setForm(prev => ({
                ...prev,
                type: 'expense',
                category: 'Mua sắm',
              }))
            }
            className={`rounded-xl px-4 py-3 font-semibold ${
              form.type === 'expense'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100'
            }`}
          >
            Chi tiêu
          </button>

          <button
            type="button"
            onClick={() =>
              setForm(prev => ({
                ...prev,
                type: 'income',
                category: 'MindX',
              }))
            }
            className={`rounded-xl px-4 py-3 font-semibold ${
              form.type === 'income'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100'
            }`}
          >
            Thu nhập
          </button>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Ngày
          </label>
          <input
            type="date"
            value={form.date}
            onChange={e => updateField('date', e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Số tiền
          </label>
          <input
            type="number"
            value={form.amount}
            onChange={e => updateField('amount', e.target.value)}
            placeholder="VD: 300000"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            {form.type === 'expense' ? 'Danh mục' : 'Nguồn thu'}
          </label>
          <select
            value={form.category}
            onChange={e => updateField('category', e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          >
            {categories.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {form.type === 'expense' && (
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Phương thức thanh toán
            </label>
            <input
              value={form.paymentMethod}
              onChange={e =>
                updateField('paymentMethod', e.target.value)
              }
              placeholder="VD: Tiền mặt, SPay, Chuyển khoản..."
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Ghi chú
          </label>
          <textarea
            value={form.note}
            onChange={e => updateField('note', e.target.value)}
            placeholder="VD: Mua đồ cá nhân, lương tháng 7..."
            className="min-h-24 w-full rounded-xl border px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white"
        >
          Lưu giao dịch
        </button>
      </form>
    </div>
  );
}