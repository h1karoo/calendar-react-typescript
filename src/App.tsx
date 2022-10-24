import React from 'react';

import './static/css/global.css'
import { createYear } from './utils/helpers/date/createYear';

console.log('createDate', createYear({locale: 'en-US'}).createYearMonthes())

export const App: React.FC = () => <div className='app__container'>calendar</div>

export default App;
