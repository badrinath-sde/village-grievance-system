import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const ComplaintForm = ({ onComplaintAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Road',
        latitude: '',
        longitude: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData({
                        ...formData,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    toast.success('Location acquired');
                },
                (error) => {
                    toast.error('Error getting location: ' + error.message);
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.latitude || !formData.longitude) {
            toast.error('Please acquire your location first');
            return;
        }
        setSubmitting(true);
        try {
            const { data } = await api.post('/complaints', {
                ...formData,
                location: {
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                },
            });
            toast.success('Complaint submitted successfully!');
            onComplaintAdded(data);
            setFormData({
                title: '',
                description: '',
                category: 'Road',
                latitude: '',
                longitude: '',
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error submitting complaint');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="auth-header">
                <h3>Submit a New Grievance</h3>
                <p>Provide details and your location for faster resolution</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="E.g., Broken water pipe near main street"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="Road">Road</option>
                        <option value="Water">Water</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Sanitation">Sanitation</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Please describe the issue in detail..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{ minHeight: '120px' }}
                    />
                </div>
                
                <div className="form-group">
                    <label>Location Coordinates</label>
                    <div className="grid grid-cols-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <input
                            type="number"
                            placeholder="Latitude"
                            value={formData.latitude}
                            readOnly
                            style={{ backgroundColor: 'hsl(var(--accent))' }}
                        />
                        <input
                            type="number"
                            placeholder="Longitude"
                            value={formData.longitude}
                            readOnly
                            style={{ backgroundColor: 'hsl(var(--accent))' }}
                        />
                    </div>
                    <button 
                        type="button" 
                        onClick={getLocation}
                        className="btn-primary"
                        style={{ backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' }}
                    >
                        📍 {formData.latitude ? 'Location Updated' : 'Auto-Detect Location'}
                    </button>
                </div>

                <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: '1rem' }}>
                    {submitting ? 'Submitting Grievance...' : 'Submit Complaint'}
                </button>
            </form>
        </div>
    );
};

export default ComplaintForm;
