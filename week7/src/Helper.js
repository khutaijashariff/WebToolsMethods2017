/**
 * Created by khutaijashariff on 3/28/17.
 */
export function compare(s1, s2) {
        let charSet = [];
        let count = 0;
        for (let first = 0; first < s1.length; first++) {
            let char1 = s1.charAt(first);
            if (!charSet[char1]) {
                charSet[char1] = 0;
            }
            charSet[char1]++;
        }
        for (let second = 0; second < s2.length; second++) {
            let char2 = s2.charAt(second);
            if (charSet[char2] >= 1) {
                count++;
                charSet[char2]--;
            }
        }
        return count;
}


export function isValid(word) {
    if (!word) {
        return false;
    }
    if (word.length !== 5) {
        return false;
    }
    if (!word.toUpperCase()) {
        return false;
    }
    return true;
}

export function isRight(rawGuess, rawWord) {
    let result = {guess: rawGuess};
    result.error = false;
    if (!isValid(rawGuess) || !isValid(rawWord)) {
        result.error = true;
    }
    let guess = rawGuess.toUpperCase();
    let word = rawWord.toUpperCase();
    if (guess === word) {
        result.match = true;
        result.count = guess.length;
    }
    result.count = compare(guess, word);
    this.saveResult(result);
}