import React from "react";

import { getMonthesNames, getWeekDaysNames, createMonth, createDate } from '../../../utils/helpers/date'

interface UseCalendarParams {
    locale?: string;
    selectedDate: Date;
    firstWeekDay: number;
}

export const useCalendar = ({firstWeekDay = 2,locale = 'default', selectedDate: date}: UseCalendarParams) => {
    const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')
    const [selectedDate, setSelectedDay] = React.useState(createDate({ date }))
    const [selectedMonth, setSelectedMonth] = React.useState(createDate({ date:new Date(selectedDate.year, selectedDate.monthIndex), locale }))

    const [selectedYear, setSelectedYear] = React.useState(selectedDate.year)

    const monthesNames = React.useMemo(() => getMonthesNames(locale), [])
    const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDay, locale), [])

    console.log('weekDaysNames', weekDaysNames);
    return {};
};

