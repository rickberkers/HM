/**
 * Creates an array of dates within specified range
 * @param startDate 
 * @param endDate 
 */
 export const createDateRange = (startDate: Date, endDate: Date) => {
    const dateArray = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDayToDate(currentDate, 1);
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