import { Topics } from "@auto-church-newsletter/service-transcript";
import { FC } from "react";
import useAppNavigation from "../../hooks/useAppNavigation";
import './calendar.scss';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

 interface CalendarDetailsProps {
    selectedDay: Topics[];
    value: Value
    onToggle: () => void;
  }

  const CalendarDetails: FC<CalendarDetailsProps> = ({
    selectedDay,
    value,
    onToggle
  }) => {
    const { navigateTo } = useAppNavigation();

    return (
      <div>
        <div className="details-content card slide-container">
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
            <button onClick={onToggle} className="secondary-button">
              <i className="icons back-icon"></i>Calendar
            </button>
            <button 
              onClick={() => {navigateTo.newsletter(selectedDay[0]?.videoId)}} 
              className="forward-button"
            >
              Go to Newsletter
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CalendarDetails;