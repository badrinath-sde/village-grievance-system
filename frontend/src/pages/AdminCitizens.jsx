import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';

const AdminCitizens = () => {
    const [citizens, setCitizens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCitizens();
    }, []);

    const fetchCitizens = async () => {
        try {
            const { data } = await api.get('/admin/users');
            const users = data.filter(user => user.role === 'user');
            setCitizens(users);
        } catch (error) {
            console.error("Error fetching citizens:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" activeTab="citizens" />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Manage Citizens</h1>
                </header>
                <div className="dashboard-content">
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem' }}>
                        Registered Citizens ({citizens.length})
                    </h3>
                    {loading ? (
                        <div className="loading-screen" style={{ minHeight: '200px' }}>
                            <div className="spinner"></div>
                            <p style={{ color: 'hsl(var(--foreground) / 0.5)', fontSize: '0.875rem' }}>Loading citizens...</p>
                        </div>
                    ) : citizens.length === 0 ? (
                        <div className="premium-empty-state">
                            <div className="premium-empty-content">
                                <span className="premium-icon">👥</span>
                                <h3>No Citizens Registered</h3>
                                <p>Citizens will appear here once they register.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="card-container">
                            {citizens.map(u => (
                                <div key={u._id} className="user-card">
                                    <div className="card-header">
                                        <h3>{u.name}</h3>
                                        <span className="badge badge-resolved">{u.role}</span>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Email:</strong> {u.email}</p>
                                        <p><strong>Phone:</strong> {u.phone}</p>
                                        <p><strong>Joined:</strong> {new Date(u.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCitizens;
