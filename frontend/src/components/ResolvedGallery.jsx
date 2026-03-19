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
            <div className="impact-empty-state">
                <div className="empty-icon-wrapper">
                    <span className="empty-icon">✨</span>
                </div>
                <h3>The Canvas is Clear</h3>
                <p>We're just getting started! As community issues are reported and completely resolved by our dedicated team, the impactful results will vividly appear right here.</p>
            </div>
        );
    }

    return (
        <div className="gallery-grid">
            {complaints.map((complaint) => (
                <div key={complaint._id} className="gallery-card" style={{ textAlign: 'left' }}>
                    <img
                        src={`http://localhost:5000/${complaint.proofImage}`}
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
