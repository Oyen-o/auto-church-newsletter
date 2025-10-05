import { SermonSegment } from '@auto-church-newsletter/service-transcript';
import { FC } from 'react';
import './preaching.scss';
interface PreachingProps {
  sermonSegment?: SermonSegment
  videoId?: string;
}

const Preaching: FC<PreachingProps> = ({ sermonSegment, videoId }) => {
  return (
    <div className="preaching pop-card">

      <div className='yt'>
        <h2>{sermonSegment?.title ?? 'Sermon Title'}</h2>
        <iframe src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" height="550px" width="550px" allowFullScreen></iframe>
      </div>
    </div>
  );
}

export default Preaching;
