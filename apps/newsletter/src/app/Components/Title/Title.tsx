import React, { FC } from 'react';
import './title.scss';


interface TitleProps {}

export const Title: FC<TitleProps> = () => {
     return (
    <header className="newsletter-header">
      <div className="newsletter-left">
        Sunday Letter
      </div>
      <div className="newsletter-right">
        JANUARY 2024
      </div>
    </header>
  )
};

export default Title;
