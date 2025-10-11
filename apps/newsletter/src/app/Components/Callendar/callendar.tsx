import React, { FC, useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import 'react-calendar/dist/Calendar.css';
import {Calendar} from 'react-calendar';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import './callendar.scss';


interface CallendarProps {

}


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const options: string[] = ['Divine Fruitfullness', 'Grace and Peace', 'Faith and Works', 'Love and Sacrifice', 'Hope in Christ'];


const Callendar: FC<CallendarProps> = ({}) => {
    const [value, onChange] = useState<Value>(new Date());
    const [searchTerm, setSearchTerm] = useState<Option[]>([]);

    return (
    <div className="callendar ">
        <div>
            <Calendar tileClassName={({ date }) => (date === value ? 'active' : 'inactive')} />
            <div className="search"> 
            <label htmlFor="search-input">Search Topic </label>
            <Typeahead id='search-typeahead' multiple onChange={(selected) => setSearchTerm(selected)} options={options} />
            </div>
        </div>
    </div>
    );
}

export default Callendar;