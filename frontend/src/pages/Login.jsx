import React, { useState } from 'react';
import { loginAdmin } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn, Mail, Lock, Dumbbell } from 'lucide-react';
import Button from '../components/Button';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginAdmin(formData);
            toast.success(res.data.message || 'Login successful!');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <div className="card animate-in" style={{ maxWidth: '400px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ 
                        background: 'rgba(59, 130, 246, 0.1)', 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 1rem' 
                    }}>
                        <Dumbbell size={32} color="var(--accent-primary)" />
                    </div>
                    <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Login to your gym management portal</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="email" 
                                className="form-control"
                                required 
                                placeholder="name@example.com"
                                style={{ paddingLeft: '40px' }}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="password" 
                                className="form-control"
                                required 
                                placeholder="••••••••"
                                style={{ paddingLeft: '40px' }}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <Button 
                        type="submit" 
                        loading={loading} 
                        icon={LogIn}
                        style={{ marginTop: '1rem' }}
                    >
                        Sign In
                    </Button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
