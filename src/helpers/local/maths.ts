/**
 * Calculates the average value of an array of numbers.
 * @param nbArray The array of  numbers.
 * @returns The average value.
 */
export function calculateAverageFromArray(nbArray: number[]) {
    const sum = nbArray.reduce((acc: number, nb: number) => acc + nb, 0);

    return sum / nbArray.length;
}

/**
 * Calculates the percentage difference between two numbers.
 * @param nb1 The first number.
 * @param nb2 The second number.
 * @returns The percentage difference.
 */
export function calculatePercentageDifference(nb1: number, nb2: number) {
    return ((nb2 - nb1) / nb1) * 100;
}