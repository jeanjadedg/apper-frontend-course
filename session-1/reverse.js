function reverse(word) {
    let splitWord = word.split('')
    splitWord = splitWord.reverse()
    return splitWord.join('')
}

const word = 'hello'
const reversedWord = reverse(word)
console.log(reversedWord) // 'olleh'
