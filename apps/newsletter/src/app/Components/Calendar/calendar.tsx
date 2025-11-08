import { FC, useEffect, useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-calendar/dist/Calendar.css';
import { Calendar as ReactCalendar } from 'react-calendar';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import './calendar.scss';
import SlideTransition, { useSlideTransition } from '../SlideTransition';
import { Topics } from '@auto-church-newsletter/service-transcript';
import useAppNavigation from '../../hooks/useAppNavigation';
import { fetchTopicByDate, fetchSearchOptions } from '../../services/cosmosService';
import { Modal } from 'react-bootstrap';

interface CalendarProps {}

const isDateEqual = (date1: Date, date2: Date): boolean => {
        const date1Str = date1.toISOString().split('T')[0];
        const date2Str = date2.toISOString().split('T')[0];
        return date1Str === date2Str;
    };

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar: FC<CalendarProps> = ({}) => {
  const { isFirstActive, toggle } = useSlideTransition(true);
  const { navigateTo } = useAppNavigation();

  const [value, onChange] = useState<Value>(new Date());
  const [dateTopics, setDateTopics] = useState<Topics[]>([]);
  const [selectedDay, setSelectedDay] = useState<Topics[]>([]);

  const [topicOptions, setTopicOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [matchingDates, setMatchingDates] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {

      console.log('Selected search terms:', selectedOptions);
      if (selectedOptions.length === 0) {
        setMatchingDates([]);
        return;
      }


      const matchingDates: string[] = [];
    console.log('Date topics to search:', dateTopics);
      dateTopics.forEach((topic) => {
        if (!topic.date || !topic.keyTopics) return;

        const dateStr = new Date(topic.date).toISOString().split('T')[0];

        // Check if ALL selected search terms are present in this topic's keyTopics
        const hasAllTerms = selectedOptions.every((selectedTopic) =>
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
      setMatchingDates(matchingDates);
  }, [selectedOptions]);

  useEffect(() => { 
    const fetchTopics = async () => {
      try {
        const data = await fetchSearchOptions();
        setTopicOptions(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }

      try {
        const data = await fetchTopicByDate();
        setDateTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }

    };
    fetchTopics();
  }, []);

  const calendarElement = (
    <ReactCalendar
      minDate={new Date(2005, 0, 1)}
      maxDate={new Date()}
      onClickDay={(date) => {onChange(date); 
        setSelectedDay(dateTopics.filter(topic => isDateEqual(new Date(topic.date), date as Date))); toggle();}}
      value={value}
      tileDisabled={({ date, view }) =>
        dateTopics.every(topic => {
          if(view !== 'month') return false;
          if (!topic.date) return false;
          const topicDate = new Date(topic.date);
          return !isDateEqual(topicDate, date)
        }) === true
      }
      tileClassName={({ date, view }) => {
        if ( view == 'month' &&
          //check to highlight a specific day under a month view
          matchingDates.find((topicDate) => {
            const dDateStr = new Date(topicDate)
              .toISOString()
              .split('T')[0];
            const dateStr = date.toISOString().split('T')[0];
            return dDateStr === dateStr;
          })
        ) {
          return 'highlighted';
        } else if (view == 'year' &&
          //check to highlight a month under a year view
          matchingDates.some((topicDate) => {
            const displayedDateStr = new Date(topicDate);
            return displayedDateStr.getMonth() === date.getMonth() && 
            displayedDateStr.getFullYear() === date.getFullYear();
          })
        ) {
          return 'highlighted';
        } else if (view == 'decade' &&
          //check to highlight a year under a decade view
          matchingDates.some((topicDate) => {
            const displayedDateStr = new Date(topicDate);
            return displayedDateStr.getFullYear() === date.getFullYear();
          })
        ) {
          return 'highlighted';
        } else if (date === new Date()) {
          //make sure today is not clickable
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
          height: '300px', //calendar height minus padding
          width: '350px',
        }}>
        <h5>Topics in service</h5>
        {value instanceof Date && <p><small>{value.toLocaleDateString()}</small></p>}
        {selectedDay.length > 0 && selectedDay[0].pastor && (
            <div className="pastor-info">
              <strong>{selectedDay[0].pastor}</strong>
            </div>
          )}
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
              height: '300px', //calendar height minus padding
              width: '350px',
            }}>
          {calendarElement}
          {detailsElement}
        </SlideTransition>

        <div className="search">
          <div className='full'>
            <a  onClick={() => setIsOpen(true)}> 
              <i className="icons full-icon"></i>Full List
            </a>
          </div>
          <Typeahead
            id="search-typeahead"
            placeholder="Search for topics..."
            flip={true}
            onChange={(o) => setSelectedOptions(o)}
            maxResults={10}
            paginationText="Show 10 more options"
            multiple
            options={topicOptions.length > 0 ? topicOptions : []}
          />
          {selectedOptions.length < 1 ? (
            <label>Search for at least one or combined topics.</label>
          ) : (
            <label>Selected topics:</label>
          )}
        </div>
      </div>


      <Modal show={isOpen} onHide={() => setIsOpen(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Full List of Topics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="topics-list">
            {dateTopics.map((topic) => (
              <div key={topic.date} className="topic-item">

                <em>{new Date(topic.date).toLocaleDateString()}:</em> <br></br> 
                <span className='list'> {topic.keyTopics ? topic.keyTopics.join(', ') : 'No topics available'}</span>
                <hr></hr>
                
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Calendar;
