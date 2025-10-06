import { SermonSegment } from '@auto-church-newsletter/service-transcript';
import { FC, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import './preaching.scss';
interface PreachingProps {
  sermonSegment?: SermonSegment
  videoId?: string;
  seekTime?: number | null;
  keyTopics?: string[];
}

const Preaching: FC<PreachingProps> = ({ sermonSegment, videoId, seekTime,keyTopics }) => {

  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (seekTime !== null && playerRef.current) {
      playerRef.current.currentTime = seekTime ?? playerRef.current.currentTime;
    }
  }, [seekTime]);

  return (
    <div className="preaching pop-card">
      <div className='yt'>
        <h2>{sermonSegment?.title ?? 'Sermon Title'}</h2>
        <ReactPlayer ref={playerRef} src={`https://www.youtube.com/watch?v=${videoId}`}
          style={{ width: '50rem', height: 'auto', aspectRatio: '16/9' }} controls={true} />
      </div>
      <div className='keyTopics'>
        <h4>Topics</h4>
        <ul>
          {keyTopics?.map((topic:string, index:number) => (
            <li key={index}>{topic} <span className='dash'> - </span></li>
          )) ?? <li>No key topics available</li>}
        </ul>
      </div>
    </div>
  );
}

export default Preaching;
