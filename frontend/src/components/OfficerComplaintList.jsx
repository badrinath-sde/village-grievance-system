import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const OfficerComplaintList = ({ complaints, onUpdate }) => {
    const [selectedComplaintId, setSelectedComplaintId] = useState(null);
    const [status, setStatus] = useState('');
    const [proof, setProof] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append('complaintId', selectedComplaintId);
        formData.append('status', status);
        if (proof) {
            formData.append('proof', proof);
        }

        try {
            await api.put('/officer/update-status', formData);
            toast.success('Status updated successfully');
            onUpdate();
            setSelectedComplaintId(null);
            setStatus('');
            setProof(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating status');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'badge-pending';
            case 'in progress': return 'badge-in-progress';
            case 'resolved': return 'badge-resolved';
            default: return '';
        }
    };

    return (
        <div className="officer-complaint-list">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '700' }}>
                {complaints.length > 0 && complaints[0].status === 'Resolved' ? 'Completed Tasks' : 'Active Tasks'}
            </h3>
            
            {complaints.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--foreground) / 0.5)' }}>
                    <p>No complaints found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-cols-2">
                    {complaints.map((complaint) => (
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
                                        By: {complaint.userId?.name}
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
                                {complaint.status !== 'Resolved' && (
                                    selectedComplaintId === complaint._id ? (
                                        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label style={{ fontSize: '0.75rem' }}>Update Status</label>
                                                <select 
                                                    value={status} 
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    style={{ padding: '0.5rem' }}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Resolved">Resolved</option>
                                                </select>
                                            </div>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label style={{ fontSize: '0.75rem' }}>Attach Final Proof (Optional)</label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setProof(e.target.files[0])}
                                                    style={{ padding: '0.25rem' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button type="submit" className="btn-primary" style={{ padding: '0.5rem' }} disabled={submitting}>
                                                    {submitting ? 'Updating...' : 'Save'}
                                                </button>
                                                <button type="button" onClick={() => setSelectedComplaintId(null)} className="btn-primary" style={{ padding: '0.5rem', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button 
                                            onClick={() => {
                                                setSelectedComplaintId(complaint._id);
                                                setStatus(complaint.status);
                                            }}
                                            className="btn-primary"
                                        >
                                            Update Progress
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OfficerComplaintList;
