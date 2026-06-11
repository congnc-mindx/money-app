import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';

export default function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden min-h-screen w-64 border-r bg-white p-6 md:block">
          <h1 className="mb-8 text-2xl font-black">
            Money App
          </h1>

          <nav className="space-y-2">
            <button
              onClick={() => setPage('dashboard')}
              className="w-full rounded-xl px-4 py-3 text-left hover:bg-gray-100"
            >
              Tổng quan
            </button>

            <button
              onClick={() => setPage('add')}
              className="w-full rounded-xl px-4 py-3 text-left hover:bg-gray-100"
            >
              Nhập giao dịch
            </button>

            <button
              onClick={() => setPage('history')}
              className="w-full rounded-xl px-4 py-3 text-left hover:bg-gray-100"
            >
              Lịch sử
            </button>

            <button
              onClick={() => setPage('year')}
              className="w-full rounded-xl px-4 py-3 text-left hover:bg-gray-100"
            >
              Tổng kết năm
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          {page === 'dashboard' && <Dashboard />}
          {page === 'add' && <AddTransaction />}

          {page === 'history' && (
            <div>
              <h1 className="text-3xl font-bold">
                Lịch sử giao dịch
              </h1>
              <p className="mt-2 text-gray-500">
                Làm sau cũng được, MVP trước cứ nhập và xem tổng quan đã.
              </p>
            </div>
          )}

          {page === 'year' && (
            <div>
              <h1 className="text-3xl font-bold">
                Tổng kết năm
              </h1>
              <p className="mt-2 text-gray-500">
                Trang này sẽ tổng hợp 12 tháng giống file Excel.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}