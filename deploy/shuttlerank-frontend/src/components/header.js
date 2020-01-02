import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './home';
import MS from './ms';
import WS from './ws';
import MD from './md';
import WD from './wd';
import XD from './xd';
import Pass from './pass';
import './header.css';
import './footer.css';

class NavBar extends Component {
    render() {
        return (
            <div>
            <div className="page">
                <Router>
                    <div className="header">
                        <h1 className="nav">Duke Badminton</h1>
                        <nav className="nav">
                            <ul>
                                <Link to="/add"><li>Add</li></Link>
                                <Link to="/xd"><li>XD</li></Link>
                                <Link to="/wd"><li>WD</li></Link>
                                <Link to="/md"><li>MD</li></Link>
                                <Link to="/ws"><li>WS</li></Link>
                                <Link to="/ms"><li>MS</li></Link>
                            </ul>
                        </nav>
                    </div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/ms" component={MS}/>
                    <Route path="/ws" component={WS}/>
                    <Route path="/md" component={MD}/>
                    <Route path="/wd" component={WD}/>
                    <Route path="/xd" component={XD}/>
                    <Route path="/add" component={Pass}/>
                </Router>
            </div>
            <div className="footer">
                        &copy; 2019 Duke Badminton
                        <br/>
                        Created by Raymond Chen
            </div>
            </div>
        );
    }
}

export default NavBar;

