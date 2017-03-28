import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import InputComponent from './InputComponent';
import ResultComponent from './ResultComponent';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: []
        }
    }

    isRight(rawGuess, rawWord) {
        let result = {guess: rawGuess};
        result.error = false;
        if (!this.isValid(rawGuess) || !this.isValid(rawWord)) {
            result.error = true;
        }
        let guess = rawGuess.toUpperCase();
        let word = rawWord.toUpperCase();
        if (guess === word) {
            result.match = true;
            result.count = guess.length;
        }
        result.count = this.compare(guess, word);
        this.saveResult(result);
    }

    saveResult(entry) {
        let msg = '';
        if (entry.guess) {
            if (entry.error) {
                msg = "Invalid word.";
            } else if (!entry.error && entry.match) {
                msg = "You win."
            } else {
                msg = entry.guess + " : " + entry.count + " letters correct.";
            }
        }
        this.setState({msg: [...this.state.msg, msg]})
    }


    isValid(word) {
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

    compare(s1, s2) {
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

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, enter a guess!
                </p>
                <InputComponent handleGetInput={this.isRight.bind(this)}/>
                <ResultComponent msg={this.state.msg}/>
            </div>
        );
    }
}

export default App;
