function reverse(word) {
    const splitWord = word
        .split('')
        .reverse()
        .join('')
    return splitWord
}

const word = 'hello'
const reversedWord = reverse(word)
console.log(reversedWord) // 'olleh'
