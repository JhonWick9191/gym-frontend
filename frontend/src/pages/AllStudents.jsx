import React, { useState, useEffect } from 'react';
import { getAllUsers, editStudent, deleteStudent, searchStudents } from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { Search, Edit2, Trash2, Calendar, Mail, User, X, Check } from 'lucide-react';
import Button from '../components/Button';

const AllStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editData, setEditData] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await getAllUsers();
            setStudents(res.data.data || []);
        } catch (error) {
            toast.error('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (val) => {
        setSearchTerm(val);
        if (val.trim() === '') {
            fetchStudents();
            return;
        }
        try {
            const res = await searchStudents({ query: val });
            setStudents(res.data.data || []);
        } catch (error) {
            console.error('Search failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await deleteStudent(id);
                setStudents(students.filter(s => s._id !== id));
                toast.success('Student deleted successfully');
            } catch (error) {
                toast.error('Failed to delete student');
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await editStudent(editData._id, {
                email: editData.email,
                toMonth: editData.toMonth
            });
            toast.success(res.data.message || 'Updated successfully');
            setEditData(null);
            fetchStudents();
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
                <div className="page-header" style={{ marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem' }}>Gym Members</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Manage your active and inactive students</p>
                    </div>
                    
                    <div className="search-bar" style={{ position: 'relative', maxWidth: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Search by name or email..." 
                            value={searchTerm}
                            style={{ paddingLeft: '40px' }}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Edit Modal Overlay */}
                {editData && (
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
                        <div className="card" style={{ maxWidth: '450px', width: '100%', border: '1px solid var(--accent-primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 className="card-title" style={{ margin: 0 }}>Edit Member</h3>
                                <button onClick={() => setEditData(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input 
                                            type="email" 
                                            className="form-control"
                                            value={editData.email} 
                                            onChange={(e) => setEditData({...editData, email: e.target.value})} 
                                            required 
                                            style={{ paddingLeft: '36px' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Expiry Date</label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input 
                                            type="date" 
                                            className="form-control"
                                            value={editData.toMonth ? new Date(editData.toMonth).toISOString().split('T')[0] : ''} 
                                            onChange={(e) => setEditData({...editData, toMonth: e.target.value})} 
                                            required 
                                            style={{ paddingLeft: '36px' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                    <Button 
                                        type="button" 
                                        variant="secondary" 
                                        onClick={() => setEditData(null)}
                                        style={{ flex: 1 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        loading={updating}
                                        icon={Check}
                                        style={{ flex: 1 }}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th><User size={14} style={{ marginRight: '8px' }} /> Member</th>
                                <th><Mail size={14} style={{ marginRight: '8px' }} /> Email</th>
                                <th><Calendar size={14} style={{ marginRight: '8px' }} /> Expiry Date</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                            Loading member data...
                                        </td>
                                    </tr>
                                ))
                            ) : students.length > 0 ? (
                                students.map(student => {
                                    const isExpired = new Date(student.toMonth) < new Date();
                                    return (
                                        <tr key={student._id}>
                                            <td style={{ fontWeight: '600' }}>{student.name}</td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{student.email}</td>
                                            <td>
                                                <span className={`badge ${isExpired ? 'badge-error' : 'badge-success'}`}>
                                                    {new Date(student.toMonth).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    <button 
                                                        onClick={() => setEditData(student)} 
                                                        className="btn-logout"
                                                        title="Edit"
                                                        style={{ color: 'var(--accent-primary)' }}
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(student._id)} 
                                                        className="btn-logout"
                                                        title="Delete"
                                                        style={{ color: 'var(--error)' }}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                        No members found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllStudents;
