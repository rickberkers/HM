// /**
//  * Function to group an array by a specific element
//  */
// export const groupBey = <T>(data: T[], key: string) => { // `data` is an array of objects, `key` is the key (or property accessor) to group by
//     // reduce runs this anonymous function on each element of `data` (the `item` parameter,
//     // returning the `storage` parameter at the end
//     return data.reduce((storage, item: T) => {
//       // get the first instance of the key by which we're grouping
//       const group = item[key];
      
//       // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
//       storage[group] = storage[group] || [];
      
//       // add this item to its group within `storage`
//       storage[group].push(item);
      
//       // return the updated storage to the reduce function, which will then loop through the next 
//       return storage; 
//     }, {}); // {} is the initial value of the storage
// };


// export const groupBy = <T>(array: T[], predicate: <T2>(v: T) => T2) => {
//     return array.reduce((acc, value) => {
//         const group = predicate(value);
//         (acc[predicate(value)] ||= []).push(value);
//         return acc;
//     }, {} as { [key: T2]: T[] });
// }

// const data = [
//     { comment: "abc", forItem: 1, inModule: 1 },
//     { comment: "pqr", forItem: 1, inModule: 1 },
//     { comment: "klm", forItem: 1, inModule: 2 },
//     { comment: "xyz", forItem: 1, inModule: 2 },
//   ];

// groupBy(data, <T>(v) => v.inModule);


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
export const addDayToDate = (date: Date, amount: number) => {
    // Use UTC date to prevent problems with time zones and DST
    date.setUTCDate(date.getUTCDate() + amount);
    return date;
};