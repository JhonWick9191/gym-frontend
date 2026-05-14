import React, { useState, useEffect } from 'react';
import { getExpiredUsers, updateFee } from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { Clock, Calendar, Check, X, RefreshCw } from 'lucide-react';
import Button from '../components/Button';

const ExpiredUsers = () => {
    const [users, setUsers] = useState([]);
    const [renewDate, setRenewDate] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await getExpiredUsers();
            setUsers(res.data.data || []);
        } catch (error) {
            toast.error('Failed to fetch expired users');
        } finally {
            setLoading(false);
        }
    };

    const handleRenew = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await updateFee(selectedUser._id, { newToMonth: renewDate });
            toast.success(res.data.message || 'Membership renewed!');
            setSelectedUser(null);
            setRenewDate('');
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container animate-in">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', color: 'var(--error)' }}>Expired Memberships</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Members whose subscriptions have ended and need renewal.</p>
                </header>
                
                {selectedUser && (
                    <div style={{ 
                        position: 'fixed', 
                        top: 0, left: 0, right: 0, bottom: 0, 
                        background: 'rgba(0,0,0,0.8)', 
                        backdropFilter: 'blur(4px)',
                        zIndex: 1100, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        padding: '1rem'
                    }}>
                        <div className="card" style={{ maxWidth: '400px', width: '100%', border: '1px solid var(--success)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 className="card-title" style={{ margin: 0 }}>Renew Membership</h3>
                                <button onClick={() => setSelectedUser(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>
                            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Renewing membership for <strong>{selectedUser.name}</strong></p>
                            <form onSubmit={handleRenew}>
                                <div className="form-group">
                                    <label className="form-label">New Expiry Date</label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input 
                                            type="date" 
                                            className="form-control"
                                            required 
                                            value={renewDate} 
                                            style={{ paddingLeft: '40px' }}
                                            onChange={(e) => setRenewDate(e.target.value)} 
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                    <Button type="button" variant="secondary" onClick={() => setSelectedUser(null)} style={{ flex: 1 }}>Cancel</Button>
                                    <Button type="submit" loading={updating} icon={Check} style={{ flex: 1 }}>Renew</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Email</th>
                                <th>Expired On</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem' }}>Loading expired users...</td></tr>
                            ) : users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td style={{ fontWeight: '600' }}>{user.name}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                                        <td>
                                            <span className="badge badge-error">
                                                {new Date(user.toMonth).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <Button 
                                                onClick={() => setSelectedUser(user)} 
                                                icon={RefreshCw}
                                                style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                            >
                                                Renew
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No expired memberships found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ExpiredUsers;
