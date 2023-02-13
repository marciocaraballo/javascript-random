const alphanumeric = string => (/^[a-z0-9]+$/i).test(string);

/** Strings have numbers in it. Order the phrase by that number */
const orderByNumberInString = words => {
    if (words === '') return '';
    
    const splitWords = words.split(' ');
    const wordsMapping = {};
    
    splitWords.forEach(splitWord => {
        const pos = splitWord.match(/\d+/)[0];
        wordsMapping[pos] = splitWord;
    });

    return Object
        .entries(wordsMapping)
        .map(pair => wordsMapping[pair[0]])
        .join(' ');
  }

const stringRotate = (s1, s2) => {
    let stringToEvaluate = s2.toLowerCase();
    let result = 'false';

    for (let i = 0; i < stringToEvaluate.length; i ++) {

        const lastChar = stringToEvaluate.charAt(stringToEvaluate.length-1);
        const fixedStringPart = stringToEvaluate.substring(0, stringToEvaluate.length - 1);

        const subs = lastChar + fixedStringPart;

        if (subs === s1.toLowerCase()) {
            result = 'true';
            break;
        } else {
            stringToEvaluate = subs;
        }
    }

    return result;
}

const birdLanguage = str => {
    const stringArray = str.split('');

    return stringArray.map(char => {
        if (/^[aeiouAEIOU]$/.test(char)) {
            return char + 'p' + char;
        }

        return char;
    }).join('');
};