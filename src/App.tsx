import React from 'react';

import './static/css/global.css'
import { createDate } from './utils/helpers/date/createDate';

console.log('createDate', createDate({locale: 'en-US'}))

export const App: React.FC = () => <div className='app__container'>calendar</div>

export default App;
