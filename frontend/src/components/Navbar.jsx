import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/login');
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" onClick={closeMenu}>Village GMS</Link>
            </div>
            
            <button 
                className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li>
                    <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
                </li>
                {user ? (
                    <>
                        <li>
                            <NavLink to={
                                user.role === 'admin' ? '/admin' :
                                    user.role === 'officer' ? '/officer' :
                                        '/dashboard'
                            } onClick={closeMenu}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
                        <li><NavLink to="/register" onClick={closeMenu}>Register</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
