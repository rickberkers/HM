import getISOWeek from "date-fns/getISOWeek";

export const getWeekDayName = (date: Date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
};

export const getAbbreviatedWeekdayName = (date: Date) => {
    const weekDayName = getWeekDayName(date);
    return weekDayName.toUpperCase().substring(0, 3);
}

export const getMonthName = (date: Date) => {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return months[date.getMonth()];
};

export const getWeekNumber = (date: Date) => {
    return getISOWeek(date);
};