import React from "react";
import { useCalendar } from "./hooks/useCalendar";

import './Calendar.css'

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
                <div aria-hidden className="calendar__header__arrow__left" />
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
                <div aria-hidden className="calendar__header__arrow__right" />
            </div>
        </div>
    )
}