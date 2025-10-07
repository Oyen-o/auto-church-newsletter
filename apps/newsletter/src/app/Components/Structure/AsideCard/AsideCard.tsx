import React from 'react';
import './AsideCard.scss';

interface AsideCardProps {
  name: string;
  role?: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}

export const AsideCard: React.FC<AsideCardProps> = ({
  name = 'John Doe',
  role = 'Pastor',
  imageUrl = './assets/pastor-1.png',
  imageAlt = 'Image',
}: AsideCardProps) => {
  return (
    <aside className='pop-card aside-card'>
      <div className="aside-card__content">
          <div className="aside-card__image">
            <img src={imageUrl} alt={imageAlt} />
          </div>
          <div className="aside-card__placeholder">
            <span>{role}: {name}</span>
          </div>
      </div>
    </aside>
  );
};

export default AsideCard;