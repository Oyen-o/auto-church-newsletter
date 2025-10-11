import React from 'react';
import Calendar from '../Calendar/calendar';
import './home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Calendar />
    </div>
  );
};

export default Home;
