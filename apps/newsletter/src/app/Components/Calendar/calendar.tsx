import React, { FC, useEffect, useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import 'react-calendar/dist/Calendar.css';
import {Calendar as ReactCalendar } from 'react-calendar';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import './calendar.scss';



interface CalendarProps {

}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const options: string[] = ['Divine Fruitfullness', 'Grace and Peace', 'Faith and Works', 'Love and Sacrifice', 'Hope in Christ'];

const Calendar: FC<CalendarProps> = ({}) => {


useEffect(() => {
    const fetchTopics = async () => {
        try {
            console.log('Fetching topics... Here');
            const response = await fetch('./youtube-transcript-mcp/key-topics/key-topic.json');
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error('Error loading topics:', error);
        }
    };
    fetchTopics();
}, []);

    const [value, onChange] = useState<Value>(new Date());;
    const [topics, setTopics] = useState<any[]>([]);
    
    const [searchTerm, setSearchTerm] = useState<Option[]>([]);

    return (
    <div className="calendar ">
            <ReactCalendar
            minDate={new Date(2005, 0, 1)}
            maxDate={new Date()}
            tileClassName={({ date }) => (date === value ? 'active' : 'inactive')}
             />
            <div className="search"> 
                <Typeahead id='search-typeahead' placeholder='Search for topics...' multiple onChange={(selected) => setSearchTerm(selected)} options={options} />
                     {searchTerm.length < 1 && <label>Search for topics that interest you</label>}
            </div>       
    </div>
    );
}

export default Calendar;