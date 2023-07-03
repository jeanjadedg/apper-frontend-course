function convertToVowels(word) {
    const onlyVowels = word
        .split('')
        .filter(item => (item == 'a' || item == 'e' ||
        item == 'i' || item == 'o' || item == 'u'))
    return onlyVowels
}

const word = 'thisissomeword'
const wordWithOnlyVowels = convertToVowels(word)
console.log(wordWithOnlyVowels) // iioeo
