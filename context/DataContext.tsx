import React, { createContext, useState, useContext, useCallback, useMemo, PropsWithChildren, useEffect } from 'react';
import { User, Job, Transaction, AppSettings, JobSubmission } from '../types';

// MOCK DATA
const initialUsers: User[] = [
  { id: 1, name: 'Azim', email: 'azim@demo.com', phone: '01700000001', password: 'password123', refId: '316944117843', leader: 'Sakib', joined: 'Jan 05, 2024', isVerified: true, proJobActive: false, referredBy: null, verificationDate: new Date().toISOString(), isAdmin: true, wallets: { proJob: 0.00, referral: 0.00, gmail: 0.00, server: 0.00, salary: 0.00, jobBalance: 40.00 } },
  { id: 2, name: 'Rina', email: 'rina@demo.com', phone: '01700000002', password: 'password123', refId: '987654321012', leader: 'Azim', joined: 'Feb 12, 2024', isVerified: false, proJobActive: false, referredBy: 1, verificationDate: null, wallets: { proJob: 10, referral: 5, gmail: 0, server: 0, salary: 0, jobBalance: 15 } },
  { id: 3, name: 'Kamal', email: 'kamal@demo.com', phone: '01700000003', password: 'password123', refId: '543210987654', leader: 'Sakib', joined: 'Mar 20, 2024', isVerified: true, proJobActive: true, referredBy: null, verificationDate: new Date().toISOString(), wallets: { proJob: 150, referral: 25, gmail: 50, server: 0, salary: 0, jobBalance: 200 } },
  { id: 99, name: 'admin', email: 'admin@demo.com', phone: '01000000000', password: 'admin', refId: 'ADMIN', leader: 'System', joined: 'Jan 01, 2024', isVerified: true, proJobActive: true, referredBy: null, verificationDate: new Date().toISOString(), isAdmin: true, wallets: { proJob: 0, referral: 0, gmail: 0, server: 0, salary: 0, jobBalance: 9999 } },
  { id: 100, name: 'GamingAzim', email: 'gamingazim240@gmail.com', phone: '01123456789', password: 'Azim2016848133', refId: 'GAMINGAZIM', leader: 'System', joined: 'Aug 01, 2024', isVerified: true, proJobActive: true, referredBy: null, verificationDate: new Date().toISOString(), isAdmin: true, wallets: { proJob: 0, referral: 0, gmail: 0, server: 0, salary: 0, jobBalance: 9999 } }
];

const initialJobs: Job[] = [
  { 
    id: 1, 
    title: 'রেজিস্ট্রেশন জব (1)', 
    description: '👇 নিচের Go To Task এর উপর ক্লিক করার পর আপনাকে ২/৩ টা প্রশ্ন করবে প্রশ্নের সঠিক উত্তর দেওয়ার পর স্পিন করতে বলবে স্পিন সম্পূর্ণ হলে আপনাকে নতুন একটি ওয়েব সাইটে নিয়ে যাবে সেই ওয়েবসাইটের রেজিস্ট্রেশন সম্পন্ন করুন।', 
    thumbnail: 'https://i.ibb.co/Fz9WpW9/job-thumbnail-1.png', 
    likes: '11k', 
    views: '12k', 
    reward: 15, 
    proofsConfig: [ 
        { type: 'image', label: 'GO To Task এ ক্লিক পর রেজিস্ট্রেশন এর আগে একটি স্ক্রিনশট নেন' }, 
        { type: 'image', label: 'রেজিস্ট্রেশন করার পর দ্বিতীয় স্ক্রিনশট দিন।' },
        { type: 'text', label: 'রেজিস্ট্রেশন করছেন যেই নাম্বার বা জিমেইল দিয়ে ওটা দেন' } 
    ],
    taskUrl: 'http://newidsasfgdkdhccxf526544.blogspot.com/',
    rules: `যদি Go Task Link এ ক্লিক করে কাজ না করতে পারেন তাহলে কপি তে ক্লিক করে যেকোন ব্রাউজারে পেস্ট করে সম্পূর্ণ করেন।
😮 আপনি নতুন হলে এগুলো ডাউনলোড করুন + ভিডিও দেখুন একদিন দেখলে আর দেখতে হবে না একদম ইজি কাজ -
💫 লিংকে ক্লিক করে কিছু না আসলে নিচের ভিপিএন ডাউনলোড করো। ডাউনলোড লেখার উপর ক্লিক করে -
1. Download Vpn
💫 বেটা ব্রাউজার download Beta Browser লেখার উপর ক্লিক করে বেটা ব্রাউজার ডাউনলোড করুন।
2. Download Beta Browser
💫 কিভাবে এ্যাড এর কাজ করবেন সম্পর্কে ভিডিও টি মনোযোগ দিয়ে একদিন দেখলে পরে আর দেখতে হবে না। Go To Vedio তে ক্লিক করে দেখে আসুন
3. Go To Vedio`
  },
  { id: 2, title: 'ফেসবুক পেজ লাইক দিন', description: 'Go To Task এর উপর ক্লিক করার পর প্রথম এ পেজটি ফলো করুন।', thumbnail: 'https://picsum.photos/seed/job2/400/200', likes: '8k', views: '10k', reward: 3, proofsConfig: [ { type: 'image', label: '1. ফলো করা পেজের স্ক্রিনশট দিন।' } ] },
];

const initialTransactions: Transaction[] = [
    { id: 1, userId: 2, userName: 'Rina', type: 'deposit', amount: 40, status: 'pending', date: '2024-07-28', transactionId: 'TXN12345RINA' },
    { id: 2, userId: 3, userName: 'Kamal', type: 'withdrawal', amount: 50, status: 'pending', date: '2024-07-27', withdrawalNumber: '01812345678', paymentMethod: 'nagad' },
];

const initialSettings: AppSettings = {
    paymentNumbers: {
        bkash: '01604660917',
        nagad: '01604660918',
        rocket: '01604660919',
    },
    telegramLinks: {
        group: 'https://t.me/EasyEarningOfficialn',
        channel: '#',
    },
    verificationFee: 40,
    referralBonus: 20,
}

const initialJobSubmissions: JobSubmission[] = [
    { id: 1, userId: 1, userName: 'Azim', jobId: 1, jobTitle: 'Auj', proofs: [{ type: 'image', label: '1:', value: 'https://i.ibb.co/pnv6b6x/proof-1.png' }, { type: 'image', label: '1:', value: 'https://i.ibb.co/SRs0pLS/proof-2.png' }, { type: 'text', label: 'Name', value: 'Sgdjdj' }], status: 'pending', submittedDate: '2026-01-08'}
]

// Helper to get data from localStorage
const getFromStorage = (key: string, fallback: any) => {
    try {
        const item = localStorage.getItem(key);
        if (item) {
            const parsed = JSON.parse(item);
            // Prevent returning null if the stored value is "null"
            if (parsed !== null) {
                return parsed;
            }
        }
        return fallback;
    } catch (e) {
        console.error(`Error reading ${key} from storage`, e);
        return fallback;
    }
};

interface DataContextType {
  currentUser: User | null;
  users: User[];
  jobs: Job[];
  transactions: Transaction[];
  appSettings: AppSettings;
  jobSubmissions: JobSubmission[];
  login: (identifier: string, pass: string) => User | null;
  signup: (details: Omit<User, 'id' | 'refId' | 'leader' | 'joined' | 'isVerified' | 'proJobActive' | 'wallets' | 'referredBy' | 'verificationDate' | 'isAdmin'> & { referralCode?: string }) => { success: boolean, message: string };
  logout: () => void;
  updateUserPassword: (email: string, newPass: string) => boolean;
  addTransaction: (tx: Omit<Transaction, 'id' | 'date' | 'userName' | 'userId'>) => void;
  updateTransactionStatus: (id: number, status: 'approved' | 'rejected') => void;
  updateUserBalance: (userId: number, wallet: keyof User['wallets'], newBalance: number) => void;
  updateUserProJobStatus: (userId: number, isActive: boolean) => void;
  addJob: (job: Omit<Job, 'id'>) => void;
  deleteJob: (id: number) => void;
  updateAppSettings: (newSettings: AppSettings) => void;
  addJobSubmission: (submission: Omit<JobSubmission, 'id' | 'submittedDate' | 'userName' | 'userId'>) => void;
  updateJobSubmissionStatus: (id: number, status: 'approved' | 'rejected') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [users, setUsers] = useState<User[]>(() => getFromStorage('users', initialUsers));
  const [jobs, setJobs] = useState<Job[]>(() => getFromStorage('jobs', initialJobs));
  const [transactions, setTransactions] = useState<Transaction[]>(() => getFromStorage('transactions', initialTransactions));
  const [appSettings, setAppSettings] = useState<AppSettings>(() => getFromStorage('appSettings', initialSettings));
  const [jobSubmissions, setJobSubmissions] = useState<JobSubmission[]>(() => getFromStorage('jobSubmissions', initialJobSubmissions));
  
  const [activeUserId, setActiveUserId] = useState<number | null>(() => getFromStorage('activeUserId', null));

  // Persist state to localStorage
  useEffect(() => { localStorage.setItem('users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('appSettings', JSON.stringify(appSettings)); }, [appSettings]);
  useEffect(() => { localStorage.setItem('jobSubmissions', JSON.stringify(jobSubmissions)); }, [jobSubmissions]);
  useEffect(() => { localStorage.setItem('activeUserId', JSON.stringify(activeUserId)); }, [activeUserId]);

  // Check for expired verifications on app load
  useEffect(() => {
    const updatedUsers = users.map(user => {
      if (user.isVerified && user.verificationDate) {
        const verificationDateObj = new Date(user.verificationDate);
        const expiryDate = new Date(verificationDateObj);
        expiryDate.setDate(expiryDate.getDate() + 30);

        if (new Date() > expiryDate) {
          return { ...user, isVerified: false, verificationDate: null };
        }
      }
      return user;
    });
     if (JSON.stringify(updatedUsers) !== JSON.stringify(users)) {
        setUsers(updatedUsers);
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const currentUser = useMemo(() => users.find(u => u.id === activeUserId) || null, [users, activeUserId]);

  const login = (identifier: string, pass: string) => {
    const user = users.find(u => 
        (u.name.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === identifier.toLowerCase()) 
        && u.password === pass
    );
    if (user) {
      setActiveUserId(user.id);
      return user;
    }
    return null;
  };

  const signup = (details: Omit<User, 'id' | 'refId' | 'leader' | 'joined' | 'isVerified' | 'proJobActive' | 'wallets' | 'referredBy' | 'verificationDate' | 'isAdmin'> & { referralCode?: string }) => {
    if (users.some(u => u.name.toLowerCase() === details.name.toLowerCase())) {
        return { success: false, message: 'Username is already taken.' };
    }
     if (users.some(u => u.email.toLowerCase() === details.email.toLowerCase())) {
        return { success: false, message: 'Email is already in use.' };
    }

    let referrer: User | undefined;
    if (details.referralCode) {
        referrer = users.find(u => u.refId === details.referralCode);
    }

    const newUser: User = {
      id: Date.now(),
      name: details.name,
      email: details.email,
      phone: details.phone,
      password: details.password,
      refId: Math.random().toString(36).substring(2, 15).toUpperCase(),
      leader: referrer ? referrer.name : 'Sakib',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      isVerified: false,
      proJobActive: false,
      referredBy: referrer ? referrer.id : null,
      verificationDate: null,
      isAdmin: false,
      wallets: { proJob: 0, referral: 0, gmail: 0, server: 0, salary: 0, jobBalance: 0 }
    };
    setUsers(prev => [...prev, newUser]);
    setActiveUserId(newUser.id);
    return { success: true, message: 'Signup successful!' };
  };

  const logout = () => {
    setActiveUserId(null);
  };

  const updateUserPassword = useCallback((email: string, newPass: string) => {
    let userFound = false;
    setUsers(prev => prev.map(user => {
        if (user.email.toLowerCase() === email.toLowerCase()) {
            userFound = true;
            return { ...user, password: newPass };
        }
        return user;
    }));
    return userFound;
  }, []);
  
  const addTransaction = useCallback((tx: Omit<Transaction, 'id' | 'date' | 'userName' | 'userId'>) => {
    if (!currentUser) return;
    setTransactions(prev => [
      ...prev, 
      { ...tx, id: Date.now(), date: new Date().toISOString().split('T')[0], userId: currentUser.id, userName: currentUser.name, }
    ]);
  }, [currentUser]);

  const updateTransactionStatus = useCallback((id: number, status: 'approved' | 'rejected') => {
    setTransactions(prevTxs => {
        const tx = prevTxs.find(t => t.id === id);
        if (!tx || tx.status !== 'pending') return prevTxs;

        if (status === 'approved') {
            if (tx.type === 'deposit') {
                setUsers(prevUsers => {
                    const depositor = prevUsers.find(u => u.id === tx.userId);
                    if (!depositor) return prevUsers;

                    return prevUsers.map(user => {
                        // Update the depositor: set as verified and add deposit amount to balance
                        if (user.id === depositor.id) {
                            return {
                                ...user,
                                isVerified: true,
                                verificationDate: new Date().toISOString(),
                                wallets: { ...user.wallets, jobBalance: user.wallets.jobBalance + tx.amount },
                            };
                        }
                        // If depositor was referred, give bonus to the referrer
                        if (depositor.referredBy && user.id === depositor.referredBy) {
                            return {
                                ...user,
                                wallets: { ...user.wallets, referral: user.wallets.referral + appSettings.referralBonus },
                            };
                        }
                        return user;
                    });
                });
            } else if (tx.type === 'withdrawal') {
                setUsers(prevUsers => prevUsers.map(user => {
                    if (user.id === tx.userId) {
                        const newBalance = user.wallets.jobBalance - tx.amount;
                        return {
                            ...user,
                            wallets: { ...user.wallets, jobBalance: newBalance >= 0 ? newBalance : 0 },
                        };
                    }
                    return user;
                }));
            }
        }
        
        // Finally, update the transaction status itself
        return prevTxs.map(t => t.id === id ? { ...t, status } : t);
    });
}, [appSettings.referralBonus]);
  
  const updateUserBalance = useCallback((userId: number, wallet: keyof User['wallets'], newBalance: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, wallets: { ...user.wallets, [wallet]: newBalance } } : user
    ));
  }, []);

  const updateUserProJobStatus = useCallback((userId: number, isActive: boolean) => {
    setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, proJobActive: isActive } : user
    ));
  }, []);

  const addJob = useCallback((job: Omit<Job, 'id'>) => {
    setJobs(prev => [{ ...job, id: Date.now() }, ...prev]);
  }, []);

  const deleteJob = useCallback((id: number) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  }, []);
  
  const updateAppSettings = (newSettings: AppSettings) => {
      setAppSettings(newSettings);
  };

  const addJobSubmission = useCallback((submission: Omit<JobSubmission, 'id' | 'submittedDate' | 'userName' | 'userId'>) => {
      if (!currentUser) return;
      setJobSubmissions(prev => [{
          ...submission,
          id: Date.now(),
          submittedDate: new Date().toISOString().split('T')[0],
          userId: currentUser.id,
          userName: currentUser.name,
      }, ...prev]);
  }, [currentUser]);

  const updateJobSubmissionStatus = useCallback((id: number, status: 'approved' | 'rejected') => {
      setJobSubmissions(prev => prev.map(sub => {
          if (sub.id === id && sub.status === 'pending' && status === 'approved') {
              const job = jobs.find(j => j.id === sub.jobId);
              if (job) {
                  setUsers(prevUsers => prevUsers.map(user => 
                    user.id === sub.userId 
                    ? { ...user, wallets: { ...user.wallets, jobBalance: user.wallets.jobBalance + job.reward } } 
                    : user
                  ));
              }
              return { ...sub, status };
          }
          if (sub.id === id) {
              return { ...sub, status };
          }
          return sub;
      }));
  }, [jobs]);

  const value = { 
    currentUser, users, jobs, transactions, appSettings, jobSubmissions,
    login, signup, logout, addTransaction, updateTransactionStatus,
    updateUserBalance, updateUserProJobStatus, addJob, deleteJob, updateAppSettings, addJobSubmission,
    updateJobSubmissionStatus, updateUserPassword
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
