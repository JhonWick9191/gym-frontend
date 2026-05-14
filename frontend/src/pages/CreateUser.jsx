import React, { useState } from 'react';
import { createUser } from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { UserPlus, User, Mail, DollarSign, Calendar, Check } from 'lucide-react';
import Button from '../components/Button';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', monthlyFee: '', fromMonth: '', toMonth: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createUser(formData);
            toast.success(res.data.message || 'Student created successfully!');
            setFormData({ name: '', email: '', monthlyFee: '', fromMonth: '', toMonth: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container animate-in">
                <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ 
                            background: 'rgba(16, 185, 129, 0.1)', 
                            width: '50px', 
                            height: '50px', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto 1rem',
                            color: 'var(--success)'
                        }}>
                            <UserPlus size={24} />
                        </div>
                        <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Add New Student</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Register a new member to the gym</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="John Doe"
                                    style={{ paddingLeft: '40px' }}
                                    value={formData.name} 
                                    required 
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input 
                                    type="email" 
                                    className="form-control"
                                    placeholder="john@example.com"
                                    style={{ paddingLeft: '40px' }}
                                    value={formData.email} 
                                    required 
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Monthly Fee</label>
                            <div style={{ position: 'relative' }}>
                                <DollarSign size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input 
                                    type="number" 
                                    className="form-control"
                                    placeholder="0.00"
                                    style={{ paddingLeft: '40px' }}
                                    value={formData.monthlyFee} 
                                    required 
                                    onChange={(e) => setFormData({...formData, monthlyFee: e.target.value})} 
                                />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">From Date</label>
                                <div style={{ position: 'relative' }}>
                                    <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input 
                                        type="date" 
                                        className="form-control"
                                        style={{ paddingLeft: '40px' }}
                                        value={formData.fromMonth} 
                                        required 
                                        onChange={(e) => setFormData({...formData, fromMonth: e.target.value})} 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">To Date</label>
                                <div style={{ position: 'relative' }}>
                                    <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input 
                                        type="date" 
                                        className="form-control"
                                        style={{ paddingLeft: '40px' }}
                                        value={formData.toMonth} 
                                        required 
                                        onChange={(e) => setFormData({...formData, toMonth: e.target.value})} 
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <Button 
                            type="submit" 
                            loading={loading} 
                            icon={Check}
                            style={{ marginTop: '1.5rem' }}
                        >
                            Register Student
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateUser;
