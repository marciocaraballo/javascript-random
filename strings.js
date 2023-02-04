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