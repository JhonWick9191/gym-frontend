import React, { useState, useEffect } from 'react';
import { getExpiringThisMonth } from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { AlertCircle, Calendar, Mail, User, DollarSign } from 'lucide-react';

const ExpiringSoon = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await getExpiringThisMonth();
                setUsers(res.data.data || []);
            } catch (error) {
                toast.error('Failed to fetch expiring users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container animate-in">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', color: 'var(--warning)' }}>Expiring This Month</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Members whose subscriptions are due for renewal this month.</p>
                </header>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th><User size={14} style={{ marginRight: '8px' }} /> Member</th>
                                <th><Mail size={14} style={{ marginRight: '8px' }} /> Email</th>
                                <th><Calendar size={14} style={{ marginRight: '8px' }} /> Expiring On</th>
                                <th><DollarSign size={14} style={{ marginRight: '8px' }} /> Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem' }}>Loading expiring members...</td></tr>
                            ) : users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td style={{ fontWeight: '600' }}>{user.name}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                                        <td>
                                            <span className="badge badge-warning">
                                                {new Date(user.toMonth).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: '600' }}>₹{user.monthlyFee}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No members expiring this month.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ExpiringSoon;
