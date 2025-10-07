import { AnnouncementSegment } from '@auto-church-newsletter/service-transcript';
import './announcement.scss';
import React from 'react';

interface AnnouncementProps {
  announcementSegment?: AnnouncementSegment;
}

const Announcement: React.FC<AnnouncementProps> = ({ announcementSegment }) => {
  console.log(
    'Rendering Announcement component with segment:',
    announcementSegment
  );
  return (
    <div>
      <h3>Announcements</h3>
      <div className="announcement-wrapper" id="announcement">
        <h3>{announcementSegment?.category}</h3>
        <div>
          {announcementSegment?.content.map((item, index) => (
            <React.Fragment key={index}>
              <div className='card'>{item.text}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
