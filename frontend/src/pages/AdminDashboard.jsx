import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AdminComplaintList from '../components/AdminComplaintList';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [officers, setOfficers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const complaintsRes = await api.get('/admin/complaints');
            const usersRes = await api.get('/admin/users');
            setComplaints(complaintsRes.data);

            const allUsers = usersRes.data;
            setOfficers(allUsers.filter(u => u.role === 'officer'));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAssignComplaint = async (complaintId, officerId) => {
        try {
            await api.put('/admin/assign-complaint', { complaintId, officerId });
            toast.success('Complaint assigned successfully');
            fetchData();
        } catch (error) {
            toast.error('Error assigning complaint');
        }
    };


    const counts = {
        total: complaints.length,
        active: complaints.filter(c => c.status !== 'Resolved').length,
        unassigned: complaints.filter(c => !c.officerId).length,
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" activeTab="complaints" />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Admin Control Panel</h1>
                </header>
                
                <div className="dashboard-content">
                    <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
                        <div className="card">
                            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.6)' }}>Total Complaints</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{counts.total}</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.6)' }}>Active</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'hsl(var(--primary))' }}>{counts.active}</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.6)' }}>Unassigned</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#92400e' }}>{counts.unassigned}</p>
                        </div>
                    </div>

                    <AdminComplaintList
                        complaints={complaints}
                        officers={officers}
                        onAssign={handleAssignComplaint}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
