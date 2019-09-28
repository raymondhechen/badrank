import React, { Component } from 'react';
import './body.css';
import './add.css';

class Add extends Component {
    render() {
        return (
            <div> 
            <div className="main">
                <h1 className="title">ADD</h1>
            </div>

            <div>
                <h2>Choose Event</h2>
                <div className="form">
                <form method="POST" action="/setDB">
                    <select name="dbName">
                            <option value="ms">MS</option>
                            <option value="ws">WS</option>
                            <option value="md">MD</option>
                            <option value="wd">WD</option>
                            <option value="xd">XD</option>
                    </select>
                    <input type="submit" value="Select"/>
                </form>
                </div>
            </div>
        
            <div>
                <h2>Add Player</h2>
                <div className="form">
                <form method="POST" action="/">
                    <input type="text" name="name"/>
                    <input type="submit" value="Add"/>
                </form>
                </div>
            </div>
        
            <div>
                <h2>Add Match</h2>
                <div className="form">
                <form method="POST" action="/update">
                    <p>Winner:</p>
                    <input type="text" name="winner"/>
                    <p>Loser:</p>
                    <input type="text" name="loser"/>
            
                    <p>Game 1:</p>
                    <input type="number" name="g1p1"/>
                    <input type="number" name="g1p2"/>
            
                    <p>Game 2:</p>
                    <input type="number" name="g2p1"/>
                    <input type="number" name="g2p2"/>
            
                    <p>Game 3:</p>
                    <input type="number" name="g3p1"/>
                    <input type="number" name="g3p2"/>
                    <br/>
                    <input type="submit" value="Add Game"/>
                </form>
                </div>
            </div>
            </div>
        );
    }
}

export default Add;