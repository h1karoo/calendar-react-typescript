import React from "react";
import { useCalendar } from "./hooks/useCalendar";

interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDay?: number;
}

export const Calendar: React.FC<CalendarProps> = ({firstWeekDay = 2,locale = 'default', selectedDate, selectDate}) => {
    const {} = useCalendar({firstWeekDay, locale, selectedDate})
    return (
        <div>Calendar</div>
    )
}