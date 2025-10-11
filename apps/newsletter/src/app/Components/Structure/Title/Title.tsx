import React, { FC } from 'react';
import './title.scss';
import { ChurchServiceTranscript } from '@auto-church-newsletter/service-transcript';


interface TitleProps {
    serviceTranscript?: ChurchServiceTranscript;
}

export const Title: FC<TitleProps> = ({ serviceTranscript }) => {
     return (
    <header className="newsletter-header">
      <div className="newsletter-left">
        Sunday newsletter
      </div>
      <div className="newsletter-center">
        <h1>{serviceTranscript?.title ?? 'Title'}</h1>
      </div>
      <div className="newsletter-right">
        { serviceTranscript?.date ?? 'Date'}
      </div>
    </header>
  )
};

export default Title;
