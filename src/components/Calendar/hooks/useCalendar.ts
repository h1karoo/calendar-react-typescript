import React from "react";

import { getMonthesNames, getWeekDaysNames, createMonth, createDate, getMonthNumberOfDays } from '../../../utils/helpers/date'

interface UseCalendarParams {
    locale?: string;
    selectedDate: Date;
    firstWeekDayNumber?: number;
}

export const useCalendar = ({
    firstWeekDayNumber = 2,
    locale = 'default',
    selectedDate: date
    }: UseCalendarParams) => {
    const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')
    const [selectedDate, setSelectedDay] = React.useState(createDate({ date }))
    const [selectedMonth, setSelectedMonth] = React.useState(createMonth({ date:new Date(selectedDate.year, selectedDate.monthIndex), locale }))

    const [selectedYear, setSelectedYear] = React.useState(selectedDate.year);

    const monthesNames = React.useMemo(() => getMonthesNames(locale), []);
    const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), []);

    const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);
    console.log('days', days);

    const calendarDays = React.useMemo(() => {
        const monthNumberOfDays = getMonthNumberOfDays(selectedDate.monthIndex, selectedYear)
        console.log('monthNumberOfDays', monthNumberOfDays);
        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        }).createMonthDays()
        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        }).createMonthDays()

        const firstDay = days[0]
        const lastDay = days[monthNumberOfDays - 1]

        const shiftIndex = firstWeekDayNumber - 1

        const numberOfPrevDays = firstDay.dayNumberInWeek - 1 - shiftIndex < 0 
        ? 7 - (firstWeekDayNumber - firstDay.dayNumberInWeek) 
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOfNextDays = 7 - lastDay.dayNumberInWeek + shiftIndex > 6 ? 7 - lastDay.dayNumberInWeek - (7-shiftIndex) : 7 - lastDay.dayNumberInWeek + shiftIndex
        console.log ('numberOfNextDays', numberOfNextDays)

    }, [
        selectedMonth.year,
        selectedMonth.monthIndex,
        selectedYear
        ])

    return {};
};

