import React, { Component } from 'react';
import Select from 'react-select';
import { options, selectStyle, formatGroupLabel } from './eventSelect';
import Rankings from './ranking';

import './body.css';
import './add.css';

class Add extends Component {
    render() {
        return (
            <div> 
            <div className="main">
                <h1 className="title">ADD</h1>
            </div>

            <div style={{textAlign:'center'}}>
                <h2>Choose Event</h2>
                <div className="event">
                <Select
                    styles={selectStyle}
                    menuPlacement="auto"
                    defaultValue={options[0]}
                    options={options}
                    formatGroupLabel={formatGroupLabel}
                />  
                </div>
            </div>
        
            <div className="twoCols">
                <div className="col1">
                    <div className="row1">
                        <h2>Add Player</h2>
                    </div>
                    <div className="form">
                        <form method="POST" action="/">
                            <input type="text" name="name"/>
                            <br/>
                            <input type="submit" value="Add"/>
                        </form>
                    </div>
                </div>
            
                <div className="col2">
                    <h2>Add Match</h2>
                    <div className="form">
                        <form method="POST" action="/update">
                            <p>Winner : Loser</p>
                            <input type="text" name="winner"/>
                            <input type="text" name="loser"/>
                    
                            <p>Game 1</p>
                            <input type="number" name="g1p1"/>
                            <input type="number" name="g1p2"/>
                    
                            <p>Game 2</p>
                            <input type="number" name="g2p1"/>
                            <input type="number" name="g2p2"/>
                    
                            <p>Game 3</p>
                            <input type="number" name="g3p1"/>
                            <input type="number" name="g3p2"/>
                            <br/>
                            <input type="submit" value="Add Game"/>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bar"/>

            <div>
                <Rankings players = {this.state.players}/>
            </div>
            </div>
        );
    }

    state = {
        players: []
        //games: []
    }

    componentDidMount() {
        fetch('http://localhost:5000/setDB?dbName=ms')
            .then(res => res.json())
            .then((data) => {
                this.setState({ players: data.players })
            })
            .catch(console.log)
    }
}

export default Add;