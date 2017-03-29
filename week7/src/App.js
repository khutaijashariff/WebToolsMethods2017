import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import InputComponent from './InputComponent';
import ResultComponent from './ResultComponent';
import {isRight} from './Helper';
import {getSecret} from './GetSecret';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: [],
        }
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

    componentDidMount() {
        const secret = getSecret();
        this.setState({secret: secret});
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
                <InputComponent secret={this.state.secret} handleGetInput={isRight.bind(this)}/>
                <ResultComponent msg={this.state.msg}/>
            </div>
        );
    }
}

export default App;
