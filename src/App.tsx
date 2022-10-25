import React from 'react';
import { Calendar } from './components/Calendar/Calendar';

import './static/css/global.css'
import { createYear } from './utils/helpers/date/createYear';

export const App: React.FC = () => {
    const [selectedDate, selectDate] = React.useState(new Date());
    return (
        <div className='app__container'>
            <Calendar selectDate={selectDate} selectedDate={selectedDate} />
        </div>
    );
}; 
export default App;
