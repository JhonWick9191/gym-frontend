import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserPlus, Users, LogOut, Dumbbell } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        // Clear local storage or cookies if any
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-brand">
                <Dumbbell size={28} className="text-accent" />
                <span>CULT FITNESS</span>
            </Link>
            <div className="navbar-links">
                <Link 
                    to="/dashboard" 
                    className={isActive('/dashboard') ? 'active' : ''}
                >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </Link>
                <Link 
                    to="/create-user" 
                    className={isActive('/create-user') ? 'active' : ''}
                >
                    <UserPlus size={18} />
                    <span>Add Student</span>
                </Link>
                <Link 
                    to="/all-students" 
                    className={isActive('/all-students') ? 'active' : ''}
                >
                    <Users size={18} />
                    <span>Members</span>
                </Link>
                <button onClick={handleLogout} className="btn-logout" title="Logout">
                    <LogOut size={18} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
