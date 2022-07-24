export const nounShouldBePlural = (quantity: number) => quantity !== 1;

export const capitalizeFirstLetter = (input: string) => {
    if(input.length < 1)
        return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
};