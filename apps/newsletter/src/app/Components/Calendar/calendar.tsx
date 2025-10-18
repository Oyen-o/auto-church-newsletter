import React, { FC, useEffect, useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import 'react-calendar/dist/Calendar.css';
import { Calendar as ReactCalendar } from 'react-calendar';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { NewsletterBlobService } from '../../services/azureBlobService';
import './calendar.scss';
import { keyTopics } from '../../mock2';
import SlideTransition, { useSlideTransition } from '../SlideTransition';
import { Topics } from '@auto-church-newsletter/service-transcript';
import useAppNavigation from '../../hooks/useAppNavigation';

interface CalendarProps {}

const isDateEqual = (date1: Date, date2: Date): boolean => {
        const date1Str = date1.toISOString().split('T')[0];
        const date2Str = date2.toISOString().split('T')[0];
        return date1Str === date2Str;
    };

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const options: string[] = [
  'Divine Fruitfullness',
  'Grace and Peace',
  'Faith and Works',
  'Love and Sacrifice',
  'Hope in Christ',
  'Joy in the Lord',
  'Gratitude',
  'Worship',
  "God's Goodness",
  'Spiritual Renewal',
];

const Calendar: FC<CalendarProps> = ({}) => {
    const { isFirstActive, toggle } = useSlideTransition(true);
     const { navigateTo } = useAppNavigation();

    const [value, onChange] = useState<Value>(new Date());
    const [topics, setTopics] = useState<Topics[]>([]);
    const [selectedDay, setSelectedDay] = useState<Topics[]>([]);

  const [searchTerm, setSearchTerm] = useState<Option[]>([]);
  const [matchingDates, setMatchingDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopicsFromAzure = async () => {
      try {
        console.log('Fetching topics from Azure Blob Storage...');

        // Use the NewsletterBlobService to load topics
        const topicsData = await NewsletterBlobService.loadTopics();
        setTopics(topicsData);

        console.log(
          'Successfully loaded topics from Azure:',
          topicsData.length,
          'topics'
        );
      } catch (error) {
        console.error('Error loading topics from Azure:', error);

        // Fallback to local fetch on error
        try {
          console.log('Falling back to local file...');
          const response = await fetch(
            './youtube-transcript-mcp/key-topics/key-topic.json'
          );
          const data = await response.json();
          setTopics(data);
          console.log('Successfully loaded topics from local fallback');
        } catch (fallbackError) {
          console.error(
            'Error loading topics from local fallback:',
            fallbackError
          );
          // Use default options if all else fails
          setTopics(options);
        }
      }
    };

    // fetchTopicsFromAzure();
  }, []);
  useEffect(() => {
    const getMatchingDates = () => {
      if (searchTerm.length === 0) return [];

      const matchingDates: string[] = [];

      keyTopics.forEach((topic) => {
        if (!topic.date || !topic.keyTopics) return;

        const dateStr = new Date(topic.date).toISOString().split('T')[0];

        // Check if ALL selected search terms are present in this topic's keyTopics
        const hasAllTerms = searchTerm.every((selectedTopic) =>
          topic.keyTopics.some((keyTopic: string) =>
            keyTopic
              .toLowerCase()
              .includes(selectedTopic.toString().toLowerCase())
          )
        );

        if (hasAllTerms && !matchingDates.includes(dateStr)) {
          matchingDates.push(dateStr);
        }
      });

      console.log('Matching dates for selected topics:', matchingDates);
      return matchingDates;
    };

    const dates = getMatchingDates();
    setMatchingDates(dates);
  }, [searchTerm]);

  const calendarElement = (
    <ReactCalendar
      minDate={new Date(2005, 0, 1)}
      maxDate={new Date()}
      onClickDay={(date) => {onChange(date); 
        setSelectedDay(keyTopics.filter(topic => isDateEqual(new Date(topic.date), date as Date))); toggle();}}
      value={value}
      tileDisabled={({ date, view }) =>
        keyTopics.every(topic => {
          if(view !== 'month') return false;
          if (!topic.date) return false;
          const topicDate = new Date(topic.date);
          return !isDateEqual(topicDate, date)
        }) === true
      }
      tileClassName={({ date, view }) => {
        if (
          
          matchingDates.find((topicDate) => {
            const dDateStr = new Date(topicDate)
              .toISOString()
              .split('T')[0];
            const dateStr = date.toISOString().split('T')[0];
            return dDateStr === dateStr;
          })
        ) {
          return 'highlighted';
        } else if (date === new Date()) {
          return 'inactive';
        } else {
          return 'inactive';
        }
      }}
    />
  );

  const detailsElement = (
    <div >
        <div className="details-content card" style={{ 
          height: '282px', //calendar height minus padding
          width: '350px',
        }}>
        <h4>Topics in service</h4>
        {value instanceof Date && <p><small>{value.toLocaleDateString()}</small></p>}
                <div className='topicList'>
          <ul>
            {selectedDay.map((topic, index) => (
                <li key={index}>
                    {topic.keyTopics && topic.keyTopics.length > 0 
                        ? topic.keyTopics.join(', ')
                        : 'No topics available'
                    }
                </li>
            ))}
        </ul>
        </div>
    
        <div className='details-footer'>
            <button onClick={() =>toggle()} className="secondary-button ">
                <i className="icons back-icon" ></i>Calendar
            </button>
            <button onClick={() => {navigateTo.newsletter(selectedDay[0]?.videoId)}} className="forward-button">
                Go to Newsletter
            </button>
        </div>
        </div>
    </div>
  );

  return (
    <>
      <div className="calendar ">
        <SlideTransition
            isFirstActive={isFirstActive}
            direction="horizontal"
            duration={150}
             style={{ 
          height: '282px', //calendar height minus padding
          width: '350px',
        }}>
            
            {calendarElement}
            {detailsElement}
        </SlideTransition>

        <div className="search">
          <Typeahead
            id="search-typeahead"
            placeholder="Search for topics..."
            multiple
            onChange={(selected) => setSearchTerm(selected)}
            options={topics.length > 0 ? topics : options}
          />
          {searchTerm.length < 1 && (
            <label>Search for topics that interest you</label>
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
