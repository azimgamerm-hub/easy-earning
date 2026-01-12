import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { User } from '../../types';

const EditUserModal = ({ user, onClose, onSaveWallets, onToggleProJob }: { user: User; onClose: () => void; onSaveWallets: (user: User) => void; onToggleProJob: (userId: number, isActive: boolean) => void; }) => {
  const [wallets, setWallets] = useState(user.wallets);
  const [proJobActive, setProJobActive] = useState(user.proJobActive);

  const handleSave = () => {
    onSaveWallets({ ...user, wallets });
    onToggleProJob(user.id, proJobActive);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Edit {user.name}</h3>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {Object.keys(wallets).map((walletKey) => (
            <div key={walletKey}>
              <label className="block text-sm font-semibold text-gray-600 capitalize mb-1">{walletKey.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="number"
                value={wallets[walletKey as keyof typeof wallets]}
                onChange={(e) => setWallets({ ...wallets, [walletKey]: parseFloat(e.target.value) || 0 })}
                className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-gray-900"
              />
            </div>
          ))}
            <div className="border-t pt-4 mt-4">
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="font-semibold text-gray-700">Pro Job Status</span>
                    <div className="relative">
                        <input type="checkbox" checked={proJobActive} onChange={() => setProJobActive(!proJobActive)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </div>
                </label>
                <p className="text-xs text-gray-500 mt-1">Enable to give this user access to Pro Jobs.</p>
            </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-700">Save</button>
        </div>
      </div>
    </div>
  );
};


const ManageUsers = () => {
  const { users, updateUserBalance, updateUserProJobStatus } = useData();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleSaveWallets = (updatedUser: User) => {
    Object.keys(updatedUser.wallets).forEach(walletKey => {
      const key = walletKey as keyof User['wallets'];
      updateUserBalance(updatedUser.id, key, updatedUser.wallets[key]);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Ref ID</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3">Pro Job</th>
              <th className="px-4 py-3">Total Balance</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3">{user.refId}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isVerified ? 'Yes' : 'No'}
                  </span>
                </td>
                 <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.proJobActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {user.proJobActive ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td className="px-4 py-3">৳{(Object.values(user.wallets) as number[]).reduce((a, b) => a + b, 0).toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditingUser(user)} className="font-medium text-cyan-600 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <EditUserModal 
          user={editingUser} 
          onClose={() => setEditingUser(null)} 
          onSaveWallets={handleSaveWallets}
          onToggleProJob={updateUserProJobStatus}
        />
      )}
    </div>
  );
};

export default ManageUsers;
