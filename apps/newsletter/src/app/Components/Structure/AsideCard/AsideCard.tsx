import React from '../../../../../react';
import './AsideCard.scss';

interface AsideCardProps {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}

export const AsideCard: React.FC<AsideCardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt = 'Image',
  className = ''
}: AsideCardProps) => {
  return (
    <aside className={`aside-card ${className}`}>
      <div className="aside-card__content">
        {imageUrl ? (
          <div className="aside-card__image">
            <img src={imageUrl} alt={imageAlt} />
          </div>
        ) : (
          <div className="aside-card__placeholder">
            <span>Lorem Ipsum</span>
          </div>
        )}
        
        <div className="aside-card__info">
          <h3 className="aside-card__title">{title}</h3>
          {subtitle && (
            <p className="aside-card__subtitle">{subtitle}</p>
          )}
          <p className="aside-card__description">{description}</p>
        </div>
      </div>
    </aside>
  );
};

export default AsideCard;