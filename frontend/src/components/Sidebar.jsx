import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ role, activeTab, setActiveTab }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsSidebarOpen(false);
    };

    return (
        <>
            <div className="mobile-sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? '✖ Close Menu' : '☰ Dashboard Menu'}
            </div>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Panel</h3>
                </div>
                <ul className="sidebar-menu">
                    {role === 'user' && (
                        <>
                            <li
                                className={activeTab === 'create' ? 'active' : ''}
                                onClick={() => handleTabClick('create')}
                            >
                                New Complaint
                            </li>
                            <li
                                className={activeTab === 'active' ? 'active' : ''}
                                onClick={() => handleTabClick('active')}
                            >
                                Active Complaints
                            </li>
                            <li
                                className={activeTab === 'history' ? 'active' : ''}
                                onClick={() => handleTabClick('history')}
                            >
                                History
                            </li>
                            <li
                                className={activeTab === 'profile' ? 'active' : ''}
                                onClick={() => handleTabClick('profile')}
                            >
                                Edit Profile
                            </li>
                        </>
                    )}

                    {role === 'admin' && (
                        <>
                            <li
                                className={location.pathname === '/admin' ? 'active' : ''}
                                onClick={() => handleNavigation('/admin')}
                            >
                                Manage Complaints
                            </li>
                            <li
                                className={location.pathname === '/admin/employees' ? 'active' : ''}
                                onClick={() => handleNavigation('/admin/employees')}
                            >
                                Manage Officers
                            </li>
                            <li
                                className={location.pathname === '/admin/citizens' ? 'active' : ''}
                                onClick={() => handleNavigation('/admin/citizens')}
                            >
                                Manage Citizens
                            </li>
                        </>
                    )}

                    {role === 'officer' && (
                        <>
                            <li
                                className={activeTab === 'assigned' ? 'active' : ''}
                                onClick={() => handleTabClick('assigned')}
                            >
                                Active Tasks
                            </li>
                            <li
                                className={activeTab === 'completed' ? 'active' : ''}
                                onClick={() => handleTabClick('completed')}
                            >
                                Completed Tasks
                            </li>
                            <li
                                className={activeTab === 'profile' ? 'active' : ''}
                                onClick={() => handleTabClick('profile')}
                            >
                                Edit Profile
                            </li>
                        </>
                    )}
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
