import { formatISO } from "date-fns";
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

/**
 * Formats date regardless of timezone
 * @see https://stackoverflow.com/questions/48172772/time-zone-issue-involving-date-fns-format
 */
 export const formatISODateNoTime = (date: Date) => {
    return formatISO(date).substring(0, 10);
}

/**
 * Parses date regardless of timezone
 * @param dateString YYYY-MM-DD
 * @returns 
 */
 export const parseISODateNoTime = (dateString: string) => {
    return new Date(`${dateString}T00:00:00Z`.slice(0, -1));
}
