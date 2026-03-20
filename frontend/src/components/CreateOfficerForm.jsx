import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const CreateOfficerForm = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/admin/create-officer', formData);
            toast.success('Officer created successfully!');
            setFormData({ name: '', email: '', password: '', phone: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating officer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-officer-form">
            <h3>Create New Officer</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Officer name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="officer@email.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" placeholder="+91 xxxxxxxxxx" value={formData.phone} onChange={handleChange} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Officer'}
                </button>
            </form>
        </div>
    );
};

export default CreateOfficerForm;
