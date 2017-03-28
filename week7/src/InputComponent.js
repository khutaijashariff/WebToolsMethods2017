/**
 * Created by khutaijashariff on 2/23/17.
 */
import React, {Component} from 'react';


class InputComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            secret: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value !== '') {
            this.props.handleGetInput(this.state.value, this.state.secret);
        }
        this.setState({value: ''});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
                <br />
            </form>
        );
    }

    componentDidMount() {
        var wordList = ["HAPPY", "GRINS", "TREES",
            "STRAP", "PARTS", "TRAPS",
            "GUESS", "GUEST", "TIGER"];
        var randomNumber = Math.floor(Math.random() * wordList.length);
        this.setState({secret: wordList[randomNumber]});
        /* this.setState({secret: wordList[randomNumber]}, function () {
         console.log(this.state.secret);
         });
         */
    }
    
}

export default InputComponent;
