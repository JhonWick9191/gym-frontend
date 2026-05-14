import React, { useState } from 'react';
import { testEmail } from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { Mail, Send, Check } from 'lucide-react';
import Button from '../components/Button';

const TestEmail = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTest = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await testEmail({ email });
            toast.success(res.data.message || 'Test email sent successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Email test failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container animate-in">
                <div className="card" style={{ maxWidth: '450px', margin: '3rem auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ 
                            background: 'rgba(59, 130, 246, 0.1)', 
                            width: '50px', 
                            height: '50px', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto 1rem',
                            color: 'var(--accent-primary)'
                        }}>
                            <Mail size={24} />
                        </div>
                        <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Test Email Service</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Verify if your SMTP settings are configured correctly by sending a test message.
                        </p>
                    </div>

                    <form onSubmit={handleTest}>
                        <div className="form-group">
                            <label className="form-label">Recipient Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input 
                                    type="email" 
                                    className="form-control"
                                    required 
                                    placeholder="Enter recipient email"
                                    style={{ paddingLeft: '40px' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <Button 
                            type="submit" 
                            loading={loading} 
                            icon={Send}
                            style={{ marginTop: '1.5rem' }}
                        >
                            Send Test Email
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TestEmail;
