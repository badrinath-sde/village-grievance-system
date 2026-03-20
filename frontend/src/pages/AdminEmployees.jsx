import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import CreateOfficerForm from '../components/CreateOfficerForm';

const AdminEmployees = () => {
    const [officers, setOfficers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOfficers();
    }, []);

    const fetchOfficers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            const employees = data.filter(user => user.role === 'officer');
            setOfficers(employees);
        } catch (error) {
            console.error("Error fetching officers:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" activeTab="employees" />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Manage Officers</h1>
                </header>
                <div className="dashboard-content">
                    <CreateOfficerForm />
                    <hr className="divider" />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem' }}>
                        Existing Officers ({officers.length})
                    </h3>
                    {loading ? (
                        <div className="loading-screen" style={{ minHeight: '200px' }}>
                            <div className="spinner"></div>
                            <p style={{ color: 'hsl(var(--foreground) / 0.5)', fontSize: '0.875rem' }}>Loading officers...</p>
                        </div>
                    ) : officers.length === 0 ? (
                        <div className="premium-empty-state">
                            <div className="premium-empty-content">
                                <span className="premium-icon">👮</span>
                                <h3>No Officers Yet</h3>
                                <p>Create your first officer using the form above.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="card-container">
                            {officers.map(officer => (
                                <div key={officer._id} className="user-card">
                                    <div className="card-header">
                                        <h3>{officer.name}</h3>
                                        <span className="badge badge-in-progress">{officer.role}</span>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Email:</strong> {officer.email}</p>
                                        <p><strong>Phone:</strong> {officer.phone}</p>
                                        <p><strong>Joined:</strong> {new Date(officer.createdAt).toLocaleDateString()}</p>
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

export default AdminEmployees;
