import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MS from './ms';
import WS from './ws';
import MD from './md';
import WD from './wd';
import XD from './xd';
import Add from './add';
import './header.css';

class NavBar extends Component {
    render() {
        return (
            <Router>
                <div className="header">
                    <h1 class="nav">Duke Badminton</h1>
                    <nav className="nav">
                        <ul>
                            <Link to="/add"><li class="noSelect">Add</li></Link>
                            <Link to="/xd"><li class="noSelect">XD</li></Link>
                            <Link to="/wd"><li class="noSelect">WD</li></Link>
                            <Link to="/md"><li class="noSelect">MD</li></Link>
                            <Link to="/ws"><li class="noSelect">WS</li></Link>
                            <Link to="/ms"><li class="noSelect">MS</li></Link>
                        </ul>
                    </nav>
                </div>
                <Route path="/ms" component={MS}/>
                <Route path="/ws" component={WS}/>
                <Route path="/md" component={MD}/>
                <Route path="/wd" component={WD}/>
                <Route path="/xd" component={XD}/>
                <Route path="/add" component={Add}/>
            </Router>
        );
    }
}

export default NavBar;

