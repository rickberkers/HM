export const dateRange = (startDate: Date, endDate: Date) => {
    const dateArray = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDayToDate(currentDate, 1);
    }

    return dateArray;
};

export const addDayToDate = (date: Date, amount: number) => {
    // Use UTC date to prevent problems with time zones and DST
    date.setUTCDate(date.getUTCDate() + amount);
    return date;
};