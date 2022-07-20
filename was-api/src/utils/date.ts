import { format } from "date-fns";

/**
 * Creates an array of dates within specified range
 * @param startDate 
 * @param endDate 
 */
 export const createDateRangeArray = (startDate: Date, endDate: Date) => {
    const dateArray = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDaysToDate(currentDate, 1);
    }

    return dateArray;
};

/**
 * Adds a specified amount of days to the specified date
 * @param date 
 * @param amount 
 */
export const addDaysToDate = (date: Date, amountDays: number) => {
    // Use UTC date to prevent problems with time zones and DST
    date.setUTCDate(date.getUTCDate() + amountDays);
    return date;
};

/**
 * Formats date regardless of timezone
 * @see https://stackoverflow.com/questions/48172772/time-zone-issue-involving-date-fns-format
 */
export const formatISODateNoTime = (date: Date) => {
    return date.toISOString().substring(0, 10);
}

/**
 * Formats date regardless of timezone
 * @param dateString YYYY-MM-DD
 * @returns 
 */
 export const parseISODateNoTime = (dateString: string) => {
    return new Date(`${dateString}T00:00:00Z`);
}
