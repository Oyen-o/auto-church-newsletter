import * as React from 'react';
import './Header.scss';

interface HeaderProps {
  churchName?: string;
  title?: string;
  subtitle?: string;
  date?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  churchName = "RCCG ---- Worship Center",
  title = "Sunday Summary",
  className = ""
}) => {
  return (
    <header className={`header ${className}`}>
      <div className="header__content">
        <h1 className="header__church-name">{churchName}</h1>
        <h2 className="header__title">{title}</h2>
      </div>
    </header>
  );
};

export default Header;