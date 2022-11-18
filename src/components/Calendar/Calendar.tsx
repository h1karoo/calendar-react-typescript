import React from "react";
import { useCalendar } from "./hooks/useCalendar";

import './Calendar.css'
import { checkDateIsEqual, checkIsToday } from "../../utils/helpers/date";

interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDayNumber?: number;
}
export const Calendar: React.FC<CalendarProps> = ({firstWeekDayNumber = 2,locale = 'default', selectedDate, selectDate}) => {
    const {state, functions} = useCalendar({firstWeekDayNumber, locale, selectedDate})
    console.log('state', state)
    return (
        <div className="calendar">
            <div className="calendar__header">
                <div aria-hidden className="calendar__header__arrow__left" 
                onClick={() => functions.onClickArrow('left')}
                />
                {state.mode === 'days' && (
                    <div aria-hidden onClick={() => functions.setMode('monthes')}>
                        {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                    </div>
                )}
                {state.mode === 'monthes' && (
                    <div aria-hidden onClick={() => functions.setMode('years')}>
                        {state.selectedYear}
                    </div>
                )}
                {state.mode === 'years' && (
                    <div onClick={() => functions.setMode('monthes')}>
                        {state.selectedYearInterval[0]} - {' '}
                        {state.selectedYearInterval[state.selectedYearInterval.length - 1]}
                    </div>
                )}
                <div aria-hidden className="calendar__header__arrow__right" 
                    onClick={() => functions.onClickArrow('right')}
                />
            </div>
            <div className="calendar__body">
                {state.mode === 'days' && (
                    <>
                        <div className='calendar__week__names'>
                        {state.weekDaysNames.map((weekDaysName) => (
                            <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                        ))}
                        </div>
                        <div className="calendar__days">{
                            state.calendarDays.map(day => {
                                const isToday = checkIsToday(day.date)
                                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDate.date)
                                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex

                                return <div aria-hidden key={`${day.dayNumber} - ${day.monthIndex}`}
                                onClick = {() => {
                                    functions.setSelectedDay(day)
                                    selectDate(day.date);
                                }} 
                                className={['calendar__day',
                                isToday ? 'calendar__today__item' : '',
                                isSelectedDay? 'calendar__selected__item' : '',
                                isAdditionalDay? 'calendar__additional__day' : ''
                                ].join(' ')}>
                                    {day.dayNumber}
                                </div>
                            })
                        }</div>
                    </>
                )}
            </div>
        </div>
    )
}