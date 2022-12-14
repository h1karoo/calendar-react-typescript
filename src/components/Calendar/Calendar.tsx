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
                            })}
                        </div>
                    </>
                )}
                {state.mode === 'monthes' && (
                    <div className="calendar__pick__items__container">
                        {state.monthesNames.map(monthesName => {
                            const isCurrentMonth = 
                            new Date().getMonth() === monthesName.monthIndex &&
                            new Date().getFullYear() === state.selectedYear
                            const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex

                            return (
                                <div
                                aria-hidden
                                onClick={() => {
                                    functions.setSelectedMonthByIndex(monthesName.monthIndex)
                                    functions.setMode('days');
                                }}
                                className={['calendar__pick__item',
                                isCurrentMonth ? 'calendar__today__item' : '',
                                isSelectedMonth? 'calendar__selected__item' : '',
                                ].join(' ')}>
                                    {monthesName.monthShort}
                                </div>
                            )
                        })}
                    </div>
                )}
                {state.mode === 'years' && (
                    <div className="calendar__pick__items__container">
                        <div className="calendar__unchoosable__year">{state.selectedYearInterval[0] - 1}</div>
                        {state.selectedYearInterval.map(year => {
                            const isCurrentYear = new Date().getFullYear() === year;
                            const isSelectedYear = year === state.selectedYear;

                            return (
                                <div
                                aria-hidden
                                onClick={() => {
                                    functions.setSelectedYear(year)
                                    functions.setMode('monthes');
                                }}
                                className={['calendar__pick__item',
                                isCurrentYear? 'calendar__today__item' : '',
                                isSelectedYear? 'calendar__selected__item' : '',
                                ].join(' ')}>
                                    {year}
                                </div>
                            )
                        })}
                        <div className="calendar__unchoosable__year">{state.selectedYearInterval[state.selectedYearInterval.length - 1] + 1}</div>
                    </div>
                )}
            </div>
        </div>
    )
}