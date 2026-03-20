import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import OfficerComplaintList from '../components/OfficerComplaintList';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

const OfficerDashboard = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [activeTab, setActiveTab] = useState('assigned');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const { data } = await api.get('/officer/complaints');
            setComplaints(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getFilteredComplaints = () => {
        if (activeTab === 'assigned') {
            return complaints.filter(c => c.status !== 'Resolved');
        } else if (activeTab === 'completed') {
            return complaints.filter(c => c.status === 'Resolved');
        }
        return [];
    };

    const counts = {
        total: complaints.length,
        assigned: complaints.filter(c => c.status !== 'Resolved').length,
        completed: complaints.filter(c => c.status === 'Resolved').length,
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="officer" activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Officer Dashboard</h1>
                </header>
                
                <div className="dashboard-content">
                    {activeTab === 'assigned' && (
                        <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
                            <div className="card">
                                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.6)' }}>Total Tasks</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{counts.total}</p>
                            </div>
                            <div className="card" style={{ borderLeft: '4px solid hsl(var(--primary))' }}>
                                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.6)' }}>Active</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'hsl(var(--primary))' }}>{counts.assigned}</p>
                            </div>
                            <div className="card" style={{ borderLeft: '4px solid #166534' }}>
                                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.6)' }}>Completed</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534' }}>{counts.completed}</p>
                            </div>
                        </div>
                    )}

                    {(activeTab === 'assigned' || activeTab === 'completed') && (
                        <OfficerComplaintList complaints={getFilteredComplaints()} onUpdate={fetchComplaints} />
                    )}
                    {activeTab === 'profile' && <Profile />}
                </div>
            </div>
        </div>
    );
};

export default OfficerDashboard;
