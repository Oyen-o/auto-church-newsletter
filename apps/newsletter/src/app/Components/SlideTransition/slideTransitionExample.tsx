import React from 'react';
import { SlideTransition, withSlideTransition, useSlideTransition } from './slideTransition';

// Example usage 1: Direct component usage
export const SlideTransitionExample: React.FC = () => {
  const { isFirstActive, toggle, slideToFirst, slideToSecond } = useSlideTransition(true);

  const FirstComponent = (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#e3f2fd', 
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px'
    }}>
      <h2>First Component</h2>
      <p>This is the first sliding component</p>
    </div>
  );

  const SecondComponent = (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f3e5f5', 
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px'
    }}>
      <h2>Second Component</h2>
      <p>This is the second sliding component</p>
    </div>
  );

  return (
    <div style={{ width: '400px', margin: '20px auto' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={slideToFirst} style={{ margin: '0 10px' }}>
          Show First
        </button>
        <button onClick={slideToSecond} style={{ margin: '0 10px' }}>
          Show Second
        </button>
        <button onClick={toggle} style={{ margin: '0 10px' }}>
          Toggle
        </button>
      </div>
      
      <SlideTransition
        isFirstActive={isFirstActive}
        direction="horizontal"
        duration={400}
        style={{ height: '200px', border: '1px solid #ccc', borderRadius: '8px' }}
      >
        {FirstComponent}
        {SecondComponent}
      </SlideTransition>
    </div>
  );
};

// Example usage 2: HOC usage
interface MyComponentProps {
  title: string;
  description: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, description }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const MyComponentWithSlides = withSlideTransition(MyComponent);

export const HOCExample: React.FC = () => {
  const { isFirstActive, toggle } = useSlideTransition(true);

  const firstComponent = (
    <div style={{ 
      backgroundColor: '#fff3e0', 
      height: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <span>🌅 Morning Content</span>
    </div>
  );

  const secondComponent = (
    <div style={{ 
      backgroundColor: '#e8f5e8', 
      height: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <span>🌙 Evening Content</span>
    </div>
  );

  return (
    <div style={{ width: '400px', margin: '20px auto' }}>
      <button onClick={toggle} style={{ marginBottom: '20px' }}>
        Switch Time of Day
      </button>
      
      <MyComponentWithSlides
        title="Daily Schedule"
        description="Church activities for different times"
        slideProps={{
          isFirstActive,
          direction: 'vertical',
          duration: 500
        }}
        firstComponent={firstComponent}
        secondComponent={secondComponent}
      />
    </div>
  );
};

// Example usage 3: Complex calendar integration
export const CalendarSlideExample: React.FC = () => {
  const { isFirstActive, toggle } = useSlideTransition(true);

  const CalendarView = (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h3>📅 Calendar View</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '5px',
        width: '280px',
        marginTop: '20px'
      }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: '30px', 
              height: '30px', 
              backgroundColor: '#white', 
              border: '1px solid #ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );

  const ListView = (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f8ff',
      height: '300px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3>📋 List View</h3>
      <div style={{ marginTop: '20px' }}>
        {['Sunday Service', 'Bible Study', 'Prayer Meeting', 'Youth Group'].map((item, i) => (
          <div 
            key={i}
            style={{ 
              padding: '10px',
              margin: '5px 0',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e0e0e0'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ width: '400px', margin: '20px auto' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={toggle}>
          Switch to {isFirstActive ? 'List' : 'Calendar'} View
        </button>
      </div>
      
      <SlideTransition
        isFirstActive={isFirstActive}
        direction="horizontal"
        duration={350}
        style={{ 
          height: '300px', 
          border: '2px solid #ddd', 
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        {CalendarView}
        {ListView}
      </SlideTransition>
    </div>
  );
};

export default SlideTransitionExample;