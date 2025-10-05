import { FC } from 'react';
import './sermon.scss';
import {
  AnnouncementSegment,
  ChurchServiceTranscript,
  getBibleReferences,
} from '@auto-church-newsletter/service-transcript';
import { BibleReference } from '../../../../../../../libs/service-transcript/dist/src';
import Announcement from '../../Segments/announcement';
import Preaching from '../../Segments/preaching';
import AsideCard from '../AsideCard/AsideCard';

let mockTranscript: ChurchServiceTranscript | null = null;

interface SermonProps {
  serviceTranscript?: ChurchServiceTranscript;
}

const Sermon: FC<SermonProps> = ({ serviceTranscript }) => (
   <>
      <div className="sermon-wrapper" id="sermon">
         {serviceTranscript ? (
            <>
               <div className='aside-left'>
                  {printAnnouncements(serviceTranscript)}
                  <AsideCard name='John Doe' role='Pastor' />
               </div>
               <div className="sermon" id="sermon">
                  <h2>Key Verses</h2>
                  <div className="verses">
                     <ul>
                        {printBibleRefs(serviceTranscript)}
                     </ul>
                  </div>

                  {serviceTranscript?.segments.length ? (
                     serviceTranscript?.segments
                        .map((segment, index) => {
                           switch (segment.type) {
                              case 'sermon':
                                 return <Preaching key={index} sermonSegment={segment} videoId={serviceTranscript.videoId} />;
                              default:
                                 return <></>;
                           }
              
                        })
                  ) : (
                     <></>
                  )}
               </div>
            </>
         ) : (
            <> Loading....</>
         )}
      </div>
   </>
)


export default Sermon;

const printBibleRefs = (serviceTranscript: ChurchServiceTranscript) =>
  getBibleReferences(serviceTranscript).map(
    (segment: BibleReference, index) => (
      <li className="verse" key={index}>
        {segment.book} {segment.chapter}:{segment.verse ?? segment.verses}
      </li>
    )
  );

  const printAnnouncements = (serviceTranscript: ChurchServiceTranscript) =>
    serviceTranscript.segments
      .filter((segment) => segment.type === 'announcement')
      .map((segment: AnnouncementSegment, index) => (
        <Announcement key={index} announcementSegment={segment} />
   ));
