import React, { FC } from 'react';
import './title.scss';
import { ChurchServiceTranscript } from '../../../../../../../libs/service-transcript/src/lib/types';


interface TitleProps {
    serviceTranscript?: ChurchServiceTranscript;
}

export const Title: FC<TitleProps> = ({ serviceTranscript }) => {
     return (
    <header className="newsletter-header sticky-header">
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
