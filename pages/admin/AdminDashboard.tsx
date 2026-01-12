import React, { useMemo } from 'react';
import { useData } from '../../context/DataContext';

const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: string; color: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl md:text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      <i className={`${icon} text-white fa-lg`}></i>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { users, jobs, transactions } = useData();
  
  const pendingDeposits = useMemo(() => transactions.filter(tx => tx.type === 'deposit' && tx.status === 'pending').length, [transactions]);
  const pendingWithdrawals = useMemo(() => transactions.filter(tx => tx.type === 'withdrawal' && tx.status === 'pending').length, [transactions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={users.length} icon="fa-solid fa-users" color="bg-blue-500" />
        <StatCard title="Active Jobs" value={jobs.length} icon="fa-solid fa-briefcase" color="bg-green-500" />
        <StatCard title="Pending Deposits" value={pendingDeposits} icon="fa-solid fa-arrow-down-to-bracket" color="bg-yellow-500" />
        <StatCard title="Pending Withdrawals" value={pendingWithdrawals} icon="fa-solid fa-arrow-up-from-bracket" color="bg-red-500" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map(tx => (
                <tr key={tx.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{tx.userName}</td>
                  <td className="px-6 py-4 capitalize">{tx.type}</td>
                  <td className="px-6 py-4">৳{tx.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      tx.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
