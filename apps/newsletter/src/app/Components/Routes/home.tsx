import React from 'react';
import Calendar from '../Calendar/calendar';
import './home.scss';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <Calendar />
    </div>
  );
};

export default HomePage;
