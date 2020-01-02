import React, { Component } from 'react';
import './body.css';

class Home extends Component {
    render() {
        return (
            <div className="main">
                <h1 className="homeTitle">DUKE CLUB BADMINTON</h1>
                <h2 className="homeDesc">Welcome! Please choose an event above to see details.</h2>
            </div>
        );
    }
}

export default Home;