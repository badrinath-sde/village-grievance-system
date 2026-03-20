import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const ComplaintList = ({ complaints }) => {
    const [feedbackData, setFeedbackData] = useState({ rating: 5, comment: '' });
    const [selectedComplaintId, setSelectedComplaintId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFeedbackSubmit = async (e, complaintId) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/feedback', {
                complaintId,
                rating: feedbackData.rating,
                comment: feedbackData.comment,
            });
            toast.success('Thank you for your feedback!');
            setSelectedComplaintId(null);
            setFeedbackData({ rating: 5, comment: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error submitting feedback');
        } finally {
            setLoading(false);
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
        <div className="complaint-list">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '700' }}>
                {complaints.length > 0 && complaints[0].status === 'Resolved' ? 'Complaint History' : 'Active Complaints'}
            </h3>
            
            {complaints.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--foreground) / 0.5)' }}>
                    <p>No complaints found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-cols-2 grid-cols-3">
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
                                <span style={{ fontSize: '0.875rem', color: 'hsl(var(--primary))', fontWeight: '500' }}>
                                    {complaint.category}
                                </span>
                            </div>

                            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground) / 0.7)', lineBreak: 'anywhere' }}>
                                {complaint.description || 'No description provided.'}
                            </p>

                            {complaint.proofImage && (
                                <div style={{ marginTop: 'auto' }}>
                                    <a href={`https://village-grievance-system.onrender.com/${complaint.proofImage}`} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={`https://village-grievance-system.onrender.com/${complaint.proofImage}`}
                                            alt="Proof"
                                            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: 'calc(var(--radius) - 4px)' }}
                                        />
                                    </a>
                                </div>
                            )}

                            {complaint.status === 'Resolved' && (
                                <div style={{ marginTop: '1rem' }}>
                                    {selectedComplaintId === complaint._id ? (
                                        <form onSubmit={(e) => handleFeedbackSubmit(e, complaint._id)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label style={{ fontSize: '0.75rem' }}>Rating</label>
                                                <select
                                                    value={feedbackData.rating}
                                                    onChange={(e) => setFeedbackData({ ...feedbackData, rating: e.target.value })}
                                                    style={{ padding: '0.5rem' }}
                                                >
                                                    {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <input
                                                    type="text"
                                                    placeholder="Your comment..."
                                                    value={feedbackData.comment}
                                                    onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
                                                    style={{ padding: '0.5rem' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button type="submit" className="btn-primary" style={{ padding: '0.5rem' }} disabled={loading}>
                                                    {loading ? 'Submitting...' : 'Submit'}
                                                </button>
                                                <button type="button" onClick={() => setSelectedComplaintId(null)} className="btn-primary" style={{ padding: '0.5rem', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button 
                                            onClick={() => setSelectedComplaintId(complaint._id)}
                                            className="btn-primary"
                                            style={{ backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', fontSize: '0.75rem' }}
                                        >
                                            Give Feedback
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplaintList;
