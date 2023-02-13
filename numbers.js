/** Given a sum number, find two pairs of number in an array that add up to sum */
const pairsSum = (numbers, sum) => {

    const pairResults = [];
    const substractions = {};

    if (typeof sum !== 'number') {
        throw new Error('sum value must be a number');
    } 

    numbers.forEach(number => {
        if (typeof number === 'number' && number in substractions) {
            pairResults.push([number, substractions[number]]);
        } else {
            substractions[sum - number] = number;
        }
    });

    return pairResults;
}

  