import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <main className="main-content">
        {children || <Outlet />}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 <a href="https://github.com/Oyen-o" target="_blank" rel="noopener noreferrer">https://github.com/Oyen-o</a>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;