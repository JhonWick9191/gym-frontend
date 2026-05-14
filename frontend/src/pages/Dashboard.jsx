import React, { useState } from 'react';
import { notifyExpiredUsers } from '../services/api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { Users, UserPlus, AlertCircle, Bell, Mail, Clock } from 'lucide-react';
import Button from '../components/Button';

const Dashboard = () => {
    const [notifying, setNotifying] = useState(false);

    const handleNotify = async () => {
        setNotifying(true);
        try {
            const res = await notifyExpiredUsers();
            toast.success(res.data.message || 'Notifications sent successfully!');
        } catch (error) {
            toast.error('Failed to trigger notifications');
        } finally {
            setNotifying(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container animate-in">
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Management Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Admin. Here's what's happening today.</p>
                </header>
                
                <div className="dashboard-grid">
                    <Link to="/all-students" className="card stat-card">
                        <div className="stat-icon">
                            <Users size={24} />
                        </div>
                        <div>
                            <div className="stat-label">Total Members</div>
                            <div className="stat-value">View All</div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                            Manage, edit and search your gym members.
                        </p>
                    </Link>

                    <Link to="/create-user" className="card stat-card">
                        <div className="stat-icon" style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)' }}>
                            <UserPlus size={24} />
                        </div>
                        <div>
                            <div className="stat-label">Registration</div>
                            <div className="stat-value">Add New</div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                            Onboard new students to the fitness club.
                        </p>
                    </Link>
                    
                    <Link to="/expired" className="card stat-card">
                        <div className="stat-icon" style={{ color: 'var(--error)', background: 'rgba(239, 68, 68, 0.1)' }}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <div className="stat-label">Membership</div>
                            <div className="stat-value">Expired</div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                            View members whose subscriptions have ended.
                        </p>
                    </Link>
                    
                    <div className="card stat-card">
                        <div className="stat-icon" style={{ color: 'var(--warning)', background: 'rgba(245, 158, 11, 0.1)' }}>
                            <Bell size={24} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div className="stat-label">Notifications</div>
                            <div className="stat-value">Alerts</div>
                        </div>
                        <Button 
                            onClick={handleNotify} 
                            loading={notifying}
                            variant="secondary"
                            icon={Mail}
                            style={{ width: '100%' }}
                        >
                            Notify Expired
                        </Button>
                    </div>

                    <Link to="/expiring-this-month" className="card stat-card">
                        <div className="stat-icon" style={{ color: 'var(--accent-primary)', background: 'rgba(59, 130, 246, 0.1)' }}>
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <div className="stat-label">Attention</div>
                            <div className="stat-value">Expiring Soon</div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                            Members with renewals due this month.
                        </p>
                    </Link>

                    <Link to="/test-email" className="card stat-card">
                        <div className="stat-icon">
                            <Mail size={24} />
                        </div>
                        <div>
                            <div className="stat-label">System</div>
                            <div className="stat-value">Test Email</div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                            Verify email configuration and delivery.
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
