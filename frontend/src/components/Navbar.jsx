import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Village GMS</Link>
            </div>
            <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className={isMenuOpen ? 'bar active' : 'bar'}></span>
                <span className={isMenuOpen ? 'bar active' : 'bar'}></span>
                <span className={isMenuOpen ? 'bar active' : 'bar'}></span>
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                {user ? (
                    <>
                        <li>
                            <Link to={
                                user.role === 'admin' ? '/admin' :
                                    user.role === 'officer' ? '/officer' :
                                        '/dashboard'
                            } onClick={() => setIsMenuOpen(false)}>
                                Dashboard
                            </Link>
                        </li>
                        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                        <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
