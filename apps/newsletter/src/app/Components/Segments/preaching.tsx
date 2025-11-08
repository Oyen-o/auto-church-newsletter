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
      <div className='plates'>
     <div className='plate keyTopics'>
        <h4>Topics</h4>
        <ul>
          {keyTopics?.map((topic:string, index:number) => (
            <li key={index}>{topic} <span className='dash'> -- </span></li>
          )) ?? <li>No key topics available</li>}
        </ul>
      </div>
      <div className='plate summary'>
        <h4>Summary</h4>
        <div>{sermonSegment?.summary ?? 'No summary available'}</div>
      </div>
      <div className='plate scripture'>
        <h4>Scripture</h4>
        <p><strong>Main Text: </strong>{sermonSegment?.mainText ? `${sermonSegment.mainText.book} ${sermonSegment.mainText.chapter}:${sermonSegment.mainText.verse ?? sermonSegment.mainText.verses}` : 'No main text available'}</p>
        <div className='supporting-texts'>
          <strong>Supporting Texts: </strong>
          <div>
            {sermonSegment?.supportingTexts?.map((text, index) => (
              <span key={index}>{`${text.book} ${text.chapter}:${text.verse ?? text.verses}`}</span>
            )) ?? <li>No supporting texts available</li>}
          </div>
            
        </div>
      </div>
      </div>
    </div>
  );
}

export default Preaching;
