import React from "react";
import { useCalendar } from "./hooks/useCalendar";

interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDayNumber?: number;
}

export const Calendar: React.FC<CalendarProps> = ({firstWeekDayNumber = 2,locale = 'default', selectedDate, selectDate}) => {
    const {state} = useCalendar({firstWeekDayNumber, locale, selectedDate})
    console.log('state', state)
    return (
        <div>Calendar</div>
    )
}