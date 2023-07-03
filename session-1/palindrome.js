function isPalindrome(word) {
    const newWord = word
        .split('')
        .reverse()
        .join('')
    
    return (word == newWord)
}

const word = 'racecar'
if (isPalindrome(word)) {
  console.log('It is a palindrome!')
} else {
  console.log('It is not a palindrome!')
}
