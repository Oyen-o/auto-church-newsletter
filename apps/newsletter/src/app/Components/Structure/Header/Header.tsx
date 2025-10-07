import * as React from 'react';
import './Header.scss';

interface HeaderProps {
  churchName?: string;
  title?: string;
  subtitle?: string;
  date?: string;
}

export const Header: React.FC<HeaderProps> = ({ churchName, title, subtitle, date
}) => {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__church-name">{churchName}</h1>
        <h2 className="header__title">{title}</h2>
      </div>
    </header>
  );
};

export default Header;