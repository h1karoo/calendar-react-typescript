import { format } from 'path';
import React from 'react';
import { Calendar } from './components/Calendar/Calendar';
import { formateDate } from './utils/helpers/date';

import './static/css/global.css'


export const App: React.FC = () => {
    const [selectedDate, selectDate] = React.useState(new Date());

    return (
        <div className='app__container'>
            <div className="date__container">
                {formateDate(selectedDate, 'DD . MM . YYYY')}
            </div>
            <Calendar selectDate={selectDate} selectedDate={selectedDate} />
        </div>
    );
}; 
export default App;
