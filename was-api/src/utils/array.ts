
/**
 * Gets the difference between the arrays
 * 
 * @param array Array containing all values
 * @param toBeRemoved Array containing functions that need to be removed
 * @param comparisonTransformator Optional logic for transforming values before comparing
 * @returns 
 */
export const arrayDifference = <T = string>(array: T[], toBeRemoved: T[], comparisonTransformator?: (value: T) => T): T[] => {
    return array.filter(item => {

        item = comparisonTransformator ? comparisonTransformator(item) : item;

        for (let index = 0; index < toBeRemoved.length; index++) {

            let toBeRemovedElement = toBeRemoved[index];
            toBeRemovedElement = comparisonTransformator ? comparisonTransformator(toBeRemovedElement): toBeRemovedElement;

            if (toBeRemovedElement === item) {
                return false;
            }
        }
        return true;
    });
}