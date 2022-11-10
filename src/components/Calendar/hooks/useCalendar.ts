import React from "react";

import { getMonthesNames, getWeekDaysNames, createMonth, createDate, getMonthNumberOfDays } from '../../../utils/helpers/date'

interface UseCalendarParams {
    locale?: string;
    selectedDate: Date;
    firstWeekDayNumber?: number;
}

const getYearsInterval = (year:number) => {
    const startYear = Math.floor(year/10) * 10
    return[...Array(10)].map((_, index) => startYear + index)
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
    const [selectedYearInterval, setSelectedYearInterval] = React.useState(getYearsInterval(selectedDate.year));

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

        const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays;

        const result = []
        
        for (let i = 0; i < numberOfPrevDays; i+=1){
            const inverted = numberOfPrevDays - i
            result[i] = prevMonthDays[prevMonthDays.length - inverted];
        }
        for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i+=1){
            result[i] = days[i - numberOfPrevDays];
        }
        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i+=1){
            result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        }
        return result
    }, [
        selectedMonth.year,
        selectedMonth.monthIndex,
        selectedYear
        ])
        console.log(calendarDays)
    return {
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthesNames,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYearInterval
        }
    };
};

