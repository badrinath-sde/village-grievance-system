import { useState } from 'react';
import toast from 'react-hot-toast';

const AdminComplaintList = ({ complaints, officers, onAssign }) => {
    const [selectedOfficer, setSelectedOfficer] = useState({});
    const [activeTab, setActiveTab] = useState('active');

    const handleAssign = (complaintId) => {
        const officerId = selectedOfficer[complaintId];
        if (officerId) {
            onAssign(complaintId, officerId);
        } else {
            toast.error('Please select an officer');
        }
    };

    const handleOfficerSelect = (complaintId, officerId) => {
        setSelectedOfficer({ ...selectedOfficer, [complaintId]: officerId });
    };

    const filteredComplaints = complaints.filter(c => {
        if (activeTab === 'active') return c.status !== 'Resolved';
        return c.status === 'Resolved';
    });

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'badge-pending';
            case 'in progress': return 'badge-in-progress';
            case 'resolved': return 'badge-resolved';
            default: return '';
        }
    };

    return (
        <div className="admin-complaint-list">
            <div className="tabs" style={{ marginBottom: '2rem' }}>
                <button
                    className={activeTab === 'active' ? 'active' : ''}
                    onClick={() => setActiveTab('active')}
                >
                    Active Complaints
                </button>
                <button
                    className={activeTab === 'resolved' ? 'active' : ''}
                    onClick={() => setActiveTab('resolved')}
                >
                    Resolved Complaints
                </button>
            </div>

            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '700' }}>
                {activeTab === 'active' ? 'Active Complaints' : 'Resolved Complaints'}
            </h3>

            {filteredComplaints.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--foreground) / 0.5)' }}>
                    <p>No complaints found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-cols-2">
                    {filteredComplaints.map((complaint) => (
                        <div key={complaint._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span className={`badge ${getStatusClass(complaint.status)}`}>
                                    {complaint.status}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground) / 0.5)' }}>
                                    {new Date(complaint.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>{complaint.title}</h4>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.875rem', color: 'hsl(var(--primary))', fontWeight: '500' }}>
                                        {complaint.category}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground) / 0.4)' }}>•</span>
                                    <span style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.6)' }}>
                                        Lat: {complaint.location.latitude.toFixed(2)}, Lon: {complaint.location.longitude.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.7)', lineBreak: 'anywhere' }}>
                                {complaint.description || 'No description provided.'}
                            </p>

                            {complaint.proofImage && (
                                <a href={`https://village-grievance-system.onrender.com/${complaint.proofImage}`} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={`https://village-grievance-system.onrender.com/${complaint.proofImage}`}
                                        alt="Proof"
                                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'calc(var(--radius) - 4px)' }}
                                    />
                                </a>
                            )}

                            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid hsl(var(--border))' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                                        {complaint.officerId ? 'Assigned Officer' : 'Assign to Officer'}
                                    </label>
                                    
                                    {complaint.officerId ? (
                                        <div style={{ padding: '0.5rem', backgroundColor: 'hsl(var(--accent))', borderRadius: 'var(--radius)', fontSize: '0.875rem' }}>
                                            {complaint.officerId.name}
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <select
                                                onChange={(e) => handleOfficerSelect(complaint._id, e.target.value)}
                                                value={selectedOfficer[complaint._id] || ''}
                                                style={{ flex: 1, padding: '0.5rem' }}
                                            >
                                                <option value="">Select Officer</option>
                                                {officers.map((officer) => (
                                                    <option key={officer._id} value={officer._id}>
                                                        {officer.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button 
                                                onClick={() => handleAssign(complaint._id)}
                                                className="btn-primary"
                                                style={{ width: 'auto', padding: '0 1rem' }}
                                            >
                                                Assign
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminComplaintList;
