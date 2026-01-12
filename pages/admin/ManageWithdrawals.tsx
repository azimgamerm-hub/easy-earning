import React from 'react';
import { useData } from '../../context/DataContext';

const ManageWithdrawals = () => {
  const { transactions, updateTransactionStatus } = useData();
  const withdrawals = transactions.filter(tx => tx.type === 'withdrawal');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Withdrawals</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Number</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.length > 0 ? withdrawals.map(tx => (
              <tr key={tx.id} className="border-b">
                <td className="px-4 py-3 font-medium text-gray-900">{tx.userName}</td>
                <td className="px-4 py-3">৳{tx.amount.toFixed(2)}</td>
                <td className="px-4 py-3 capitalize">{tx.paymentMethod || 'N/A'}</td>
                <td className="px-4 py-3">{tx.withdrawalNumber}</td>
                <td className="px-4 py-3">{tx.date}</td>
                <td className="px-4 py-3">
                   <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    tx.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {tx.status === 'pending' && (
                    <div className="space-x-2">
                      <button onClick={() => updateTransactionStatus(tx.id, 'approved')} className="font-medium text-green-600 hover:underline">Approve</button>
                      <button onClick={() => updateTransactionStatus(tx.id, 'rejected')} className="font-medium text-red-600 hover:underline">Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            )) : (
               <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">No entries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageWithdrawals;
