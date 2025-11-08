import React from 'react';
import Sermon from './Components/Structure/sermon/sermon';
import './app.scss';
import { ChurchServiceTranscript } from '@auto-church-newsletter/service-transcript';
import fetchSermonTranscript from './services/cosmosService';
import { useParams } from 'react-router-dom';


export function SermonPage() {
const { videoId } = useParams();
  const [serviceTranscript, setServiceTranscript] = React.useState<ChurchServiceTranscript | null>(null);

  React.useEffect(() => {
  const fetchTranscript = async () => {
    try {
      console.log('Fetching sermon data for videoId:', videoId);
      if (!videoId) {
        console.error('No videoId provided in route parameters');
        return;
      }

      const sermonData: ChurchServiceTranscript = await fetchSermonTranscript(videoId)
      console.log('Fetched sermon data:', sermonData);
      setServiceTranscript(sermonData);
      
    } catch (error) {
      console.error('Error fetching sermon data:', error);
      // Handle error appropriately - could set error state or fallback to mock data
    }
  };

  fetchTranscript();
}, []);

  return (
    <div className="sermon-background">
      {serviceTranscript && (
        <>
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
          <Sermon serviceTranscript={serviceTranscript}></Sermon>
        </>
      )}
    </div>
  );
}

export default SermonPage;
