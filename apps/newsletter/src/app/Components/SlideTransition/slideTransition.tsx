import React, { useState, useEffect, ReactNode, CSSProperties } from 'react';
import './slideTransition.scss';

export interface SlideTransitionProps {
  children: [ReactNode, ReactNode]; // Exactly two components
  isFirstActive: boolean;
  direction?: 'horizontal' | 'vertical';
  duration?: number; // in milliseconds
  className?: string;
  style?: CSSProperties;
}

export interface SlideTransitionHOC {
  <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.ComponentType<P & {
    slideProps: Omit<SlideTransitionProps, 'children'>;
    firstComponent: ReactNode;
    secondComponent: ReactNode;
  }>;
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  isFirstActive,
  direction = 'horizontal',
  duration = 300,
  className = '',
  style = {}
}) => {
  const [currentIndex, setCurrentIndex] = useState(isFirstActive ? 0 : 1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const newIndex = isFirstActive ? 0 : 1;
    if (newIndex !== currentIndex) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
      }, duration / 2);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isFirstActive, currentIndex, duration]);

  const containerStyle: CSSProperties = {
    '--slide-duration': `${duration}ms`,
    ...style
  } as CSSProperties;

  const getSlideClasses = (index: number) => {
    const baseClass = 'slide-component';
    const directionClass = direction === 'vertical' ? 'slide-vertical' : 'slide-horizontal';
    
    let positionClass = '';
    if (isTransitioning) {
      positionClass = 'slide-transitioning';
    } else if (index === currentIndex) {
      positionClass = 'slide-active';
    } else {
      positionClass = index < currentIndex ? 'slide-left' : 'slide-right';
    }

    return `${baseClass} ${directionClass} ${positionClass}`;
  };

  return (
    <div 
      className={`slide-transition-container ${className}`}
      style={containerStyle}
    >
      <div className={getSlideClasses(0)}>
        {children[0]}
      </div>
      <div className={getSlideClasses(1)}>
        {children[1]}
      </div>
    </div>
  );
};

// Higher Order Component
export const withSlideTransition: SlideTransitionHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const SlideTransitionWrapper: React.FC<P & {
    slideProps: Omit<SlideTransitionProps, 'children'>;
    firstComponent: ReactNode;
    secondComponent: ReactNode;
  }> = ({ slideProps, firstComponent, secondComponent, ...props }) => {
    return (
      <SlideTransition {...slideProps}>
        {firstComponent}
        {secondComponent}
      </SlideTransition>
    );
  };

  SlideTransitionWrapper.displayName = `withSlideTransition(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return SlideTransitionWrapper;
};

// Hook for easier state management
export const useSlideTransition = (initialState: boolean = true) => {
  const [isFirstActive, setIsFirstActive] = useState(initialState);

  const slideToFirst = () => setIsFirstActive(true);
  const slideToSecond = () => setIsFirstActive(false);
  const toggle = () => setIsFirstActive(prev => !prev);

  return {
    isFirstActive,
    slideToFirst,
    slideToSecond,
    toggle,
    setIsFirstActive
  };
};

export default SlideTransition;