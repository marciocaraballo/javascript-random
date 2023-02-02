/** Given a sum number, find two pairs of number in an array that add up to sum */
const pairsSum = (numbers, sum) => {

    const pairResults = [];
    const substractions = {};

    numbers.forEach(number => {
        if (typeof number === 'number' && number in substractions) {
            pairResults.push([number, substractions[number]]);
        } else {
            substractions[sum - number] = number;
        }
    });

    return pairResults;
}

console.log(pairsSum([-15,1,7,9,4,12,22,40,2,5,20,25,10,29,45,30,0], 30));