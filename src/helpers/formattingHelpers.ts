export const nounShouldBePlural = (quantity: number) => quantity !== 1;

export const getWeekDayName = (date: Date) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};