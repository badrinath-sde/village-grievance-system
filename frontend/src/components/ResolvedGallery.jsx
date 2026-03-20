import { useState, useEffect } from 'react';
import api from '../services/api';

const ResolvedGallery = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchResolved = async () => {
            try {
                const { data } = await api.get('/public/resolved-complaints');
                setComplaints(data);
            } catch (error) {
                console.error("Error fetching resolved complaints", error);
            }
        };
        fetchResolved();
    }, []);

    if (complaints.length === 0) {
        return (
            <div className="premium-empty-state">
                <div className="premium-empty-content">
                    <span className="premium-icon">🏆</span>
                    <h3>A Perfect Start</h3>
                    <p>No community issues have been reported or resolved yet! Our village is currently running smoothly.</p>
                    <button onClick={() => window.location.href='/login'} className="hp-btn hp-btn--primary" style={{ marginTop: '25px', display: 'inline-block' }}>Report an Issue</button>
                </div>
            </div>
        );
    }

    return (
        <div className="gallery-grid">
            {complaints.map((complaint) => (
                <div key={complaint._id} className="gallery-card" style={{ textAlign: 'left' }}>
                    <img
                        src={`https://village-grievance-system.onrender.com/${complaint.proofImage}`}
                        alt="Proof"
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '20px' }}>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#0F172A' }}>{complaint.title}</h3>
                        <p style={{ color: '#64748B', marginBottom: '15px' }}>{complaint.description.substring(0, 100)}...</p>
                        <small style={{ color: '#94A3B8', fontWeight: '600' }}>Resolved on: {new Date(complaint.updatedAt).toLocaleDateString()}</small>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResolvedGallery;
