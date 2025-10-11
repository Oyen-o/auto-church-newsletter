import { FC, JSX, useState } from 'react';
import './sermon.scss';
import {
  AnnouncementSegment,
  BibleVerseSegment,
  ChurchServiceTranscript,
} from '@auto-church-newsletter/service-transcript';
import { isBibleVerseSegment } from '@auto-church-newsletter/service-transcript';
import Announcement from '../../Segments/announcement';
import Preaching from '../../Segments/preaching';
import AsideCard from '../AsideCard/AsideCard';
import { SegmentTimestamp } from '../timestamp/timestamp';

let mockTranscript: ChurchServiceTranscript | null = null;

interface SermonProps {
  serviceTranscript?: ChurchServiceTranscript;
}

const Sermon: FC<SermonProps> = ({ serviceTranscript }) => {
  const [seekTime, setSeekTime] = useState<number | null>(null);

  const handleSeekYoutube = (startTime: number) => {
    setSeekTime(startTime);
    // Reset after 1 second so the same timestamp can be selected again,
    setTimeout(() => setSeekTime(null), 1000);
  };

  const printBibleRefs = (serviceTranscript: ChurchServiceTranscript) => {
    let template: JSX.Element[] = [];
    serviceTranscript.segments
      .filter(isBibleVerseSegment)
      .forEach((segment: BibleVerseSegment, index) => {
        const bibleRef = segment.bibleRef;
        const str = `${bibleRef.book} ${bibleRef.chapter}:${
          bibleRef.verse ?? bibleRef.verses
        }`;
        template.push(
          <li
            className="verse timestamp-link"
            key={index}
            onClick={() => handleSeekYoutube(segment.content[0].startSecs - 1)}
            title={`Jump to ${bibleRef.book} ${str} in the video`}
          >
            {str}
          </li>
        );
      });
    return template.map((item) => item);
  };
  const printAnnouncements = (serviceTranscript: ChurchServiceTranscript) =>
    serviceTranscript.segments
      .filter((segment) => segment.type === 'announcement')
      .map((segment: AnnouncementSegment, index) => (
        <div key={index}>
          <Announcement announcementSegment={segment} />
          <SegmentTimestamp
            timeDisplay={segment.startTime}
            time={segment.content[0].startSecs}
            onClick={handleSeekYoutube}
          />
        </div>
      ));

  return (
    <>
      <div className="sermon-wrapper" id="sermon">
        {serviceTranscript ? (
          <>
            <div className="aside-left pop-card">
              {printAnnouncements(serviceTranscript)}
              <AsideCard name={serviceTranscript.pastor ?? '[COULDN\'T_PARSE]'} role="Pastor" imageUrl='./assets/pastor-1.png' />
            </div>
            <div className="sermon" id="sermon">
              {serviceTranscript?.segments.length ? (
                serviceTranscript?.segments.map((segment, index) => {
                  switch (segment.type) {
                    case 'sermon':
                      return (
                        <Preaching
                           key={index}
                           seekTime={seekTime}
                           sermonSegment={segment}
                           keyTopics={serviceTranscript.keyTopics ? serviceTranscript.keyTopics : []}
                           videoId={serviceTranscript.videoId}
                        />
                      );
                    default:
                      return <></>;
                  }
                })
              ) : (
                <></>
              )}
            </div>

            <div className="aside-right pop-card">
              <h2>Verses</h2>
              <div className="verses">
                <ul>{printBibleRefs(serviceTranscript)}</ul>
              </div>
            </div>
          </>
        ) : (
          <> Loading....</>
        )}
      </div>
    </>
  );
};

export default Sermon;
