import React from 'react';
import './timestamp.scss';

interface SegmentTimestampProps {
  timeDisplay: string; // - format "HH:MM:SS"
  time: number; // in seconds
  onClick?: (startTime: number) => void;
}

function formatTime(secs: number) {
  const min = Math.floor(secs / 60);
  const sec = Math.floor(secs % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export const SegmentTimestamp: React.FC<SegmentTimestampProps> = ({ timeDisplay: startDisplay, time, onClick }) => (
  <div className='seg-timestamp timestamp-link'>
      <span
      onClick={() => onClick && onClick(time)}
      style={{ textDecoration: onClick ? 'underline' : undefined }}
      title={onClick ? 'Jump to this time in the video' : undefined}
    >
      {startDisplay ? startDisplay : '0:00:00'}
    </span>
  </div>
);