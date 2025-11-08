// unused calendar component extracted from calendar.tsx

import { Topics } from "@auto-church-newsletter/service-transcript";
import ReactCalendar from "react-calendar";
import './calendar.scss';
import { FC, useEffect, useState } from "react";

const isDateEqual = (date1: Date, date2: Date): boolean => {
        const date1Str = date1.toISOString().split('T')[0];
        const date2Str = date2.toISOString().split('T')[0];
        return date1Str === date2Str;
    };

    
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarElementProps {
    value: Date | null | [Date | null, Date | null];
    selectedDay: Topics[];
    setSelectedDay: (topics: Topics[]) => void;
    toggle: () => void;
    keyTopics: Topics[];
    matchingDates: string[];
}


const CalendarElement: FC<CalendarElementProps> = ({
    toggle,
    keyTopics,
    matchingDates,
}) => {

    const [value, onChange] = useState<Value>(new Date());
    const [topics, setTopics] = useState<Topics[]>([]);
    const [selectedDay, setSelectedDay] = useState<Topics[]>([]);

    useEffect(() => {
    console.log('CalendarElement mounted with keyTopics:', keyTopics);
}, []);


return (
    <div className='slide-container'>
    <ReactCalendar
        minDate={new Date(2005, 0, 1)}
        maxDate={new Date()}
        onClickDay={(date) => {
        onChange(date); 
        setSelectedDay(keyTopics.filter(topic => isDateEqual(new Date(topic.date), date as Date))); 
        toggle();
    }}
        value={value}
        tileDisabled={({ date, view }) => {
            return keyTopics.every(topic => {
                console.log('Checking topic date:', topic.date, 'against date:', date);
                if(view !== 'month') return false;
                if (!topic.date) return false;
                const topicDate = new Date(topic.date);
            return !isDateEqual(topicDate, date)
        }) === false
        }}
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
    </div>
);
};

export default CalendarElement;