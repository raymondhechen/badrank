import React, { Component } from 'react';
import Add from './add';
import Password from './password';

import './body.css';
import './add.css';

class Pass extends Component {
    state = {
        passCorrect: false
    }

    callBack = (passBool) => {
        this.setState({passCorrect: passBool})
    }

    render() {
        // If password incorrect, show password field
        if (!this.state.passCorrect) {
            return (
                <div>
                <div className="main">
                    <h1 className="title">ADD</h1>
                </div>

                
                <Password parCallBack={this.callBack}/>
                </div>
            );
        }
        // If password correct, render add forms
        else {
            return (
                <div>
                <div className="main">
                    <h1 className="title">ADD</h1>
                </div>

                <Add/>
                </div>
            );
        }
    }
    
}

export default Pass;