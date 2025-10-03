import React from 'react';
import { ChurchServiceTranscript } from '../../../../libs/service-transcript/src/lib/types';
import Header from './Components/Structure/Header/Header';
import Title from './Components/Structure/Title/Title';
import Sermon from './Components/Structure/sermon/sermon';
import './app.scss';
import mockTranscript from '../mock';

React.useEffect(() => {
  const fetchData = async () => {
    // Simulate fetching data
    const response = await new Promise<ChurchServiceTranscript>((resolve) =>
      setTimeout(() => resolve(mockTranscript ), 1000)
    );
    // Update state with fetched data
  };

  fetchData();
}, []);

export function App() {
  return (
    <div className="app">
      {mockTranscript && (
        <>
          <Header churchName={mockTranscript.church} title={mockTranscript.title} date={mockTranscript.date}></Header>
          <Title serviceTranscript={mockTranscript}></Title>
          <Sermon serviceTranscript={mockTranscript}></Sermon>
        </>
      )}
    </div>
  );
}

export default App;
