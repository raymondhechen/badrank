import React, { Component } from 'react';

import './body.css';
import './password.css';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendPassState(this.state.value);
    }

    sendPassState = () => {
        this.props.parCallBack(this.state.value === "password");
    }

    render() {
        return (
            <div>
                <h2>Enter Password:</h2>
                <form className="passBody" onSubmit={this.handleSubmit}>
                    <input type="password" value={this.state.value} onChange={this.handleChange}/>
                    <br/>
                    <input type="submit" value="Enter"/>
                </form>
            </div>
        );
    }
}

export default Password;