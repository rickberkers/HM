export const nounShouldBePlural = (quantity: number) => quantity !== 1;

export const getWeekDayName = (date: Date, capitalize: boolean = true) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    if (capitalize) {
        return capitalizeFirstLetter(days[date.getDay()]);
    }
    return days[date.getDay()];
};

export const getMonthName = (date: Date, capitalize: boolean = true) => {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    if (capitalize) {
        return capitalizeFirstLetter(months[date.getMonth()]);
    }
    return months[date.getMonth()];
};

export const capitalizeFirstLetter = (input: string) => {
    if(input.length < 1)
        return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
};