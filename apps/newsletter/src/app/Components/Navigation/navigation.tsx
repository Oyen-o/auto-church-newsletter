import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navigation.scss';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/newsletter', label: 'Newsletter', icon: '📰' },
  ];

  return (
    <nav className={`navigation ${className}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">⛪</span>
            <span className="brand-text">Church Newsletter</span>
          </Link>
        </div>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;