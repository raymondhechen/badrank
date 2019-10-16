import React, { Component } from 'react';
import Select from 'react-select';
import { options, selectStyle, formatGroupLabel } from './eventSelect';
import Rankings from './ranking';
import Games from './games';

import './body.css';
import './add.css';

class Add extends Component {
    render() {
        if (this.state.type === "singles") {
            return (
                <div>
                <div style={{textAlign:'center'}}>
                    <h2>Choose Event</h2>
                    <div className="event">
                    <Select
                        styles={selectStyle}
                        menuPlacement="auto"
                        defaultValue={options[0]}
                        options={options}
                        formatGroupLabel={formatGroupLabel}
                        onChange={this.handleChange}
                    />  
                    </div>
                </div>
            
                <div className="twoCols">
                    <div className="col1">
                        <div className="row1">
                            <h2>Add Player</h2>
                        </div>
                        <div className="form">
                            <form>
                                <input type="text" name="name" placeholder="<Player>"/>
                                <br/>
                                <input type="submit" value="Add"/>
                            </form>
                        </div>
                    </div>
                
                    <div className="col2">
                        <h2>Add Match</h2>
                        <div className="form">
                            <form>
                                <p>Winner : Loser</p>
                                <input type="text" name="winner" placeholder="<Winner>"/>
                                <input type="text" name="loser" placeholder="<Loser>"/>
                        
                                <p>Game 1</p>
                                <input type="number" name="g1p1" placeholder="<Winner>"/>
                                <input type="number" name="g1p2" placeholder="<Loser>"/>
                        
                                <p>Game 2</p>
                                <input type="number" name="g2p1" placeholder="<Winner>"/>
                                <input type="number" name="g2p2" placeholder="<Loser>"/>
                        
                                <p>Game 3</p>
                                <input type="number" name="g3p1" placeholder="<Winner>"/>
                                <input type="number" name="g3p2" placeholder="<Loser>"/>
                                <br/>
                                <input type="submit" value="Add"/>
                            </form>
                        </div>
                    </div>
                </div>
    
                <div className="bar"/>
    
                <div>
                    <Rankings type={this.state.type} players={this.state.players}/>
                </div>
                <div>
                    <Games type={this.state.type} games={this.state.games}/>
                </div>
                <br/>
                </div>
            );
        }
        else if (this.state.type === "doubles") {
            return (
                <div>
                <div style={{textAlign:'center'}}>
                    <h2>Choose Event</h2>
                    <div className="event">
                    <Select
                        styles={selectStyle}
                        menuPlacement="auto"
                        defaultValue={options[0]}
                        options={options}
                        formatGroupLabel={formatGroupLabel}
                        onChange={this.handleChange}
                    />  
                    </div>
                </div>
            
                <div className="twoCols">
                    <div className="col1">
                        <div className="row1">
                            <h2>Add Players</h2>
                        </div>
                        <div className="form">
                            <form>
                                <input type="text" name="name1" placeholder="<Player 1>"/>
                                <br/>
                                <input type="text" name="name2" defaultValue="" placeholder="<Player 2>"/>
                                <br/>
                                <input type="submit" value="Add"/>
                            </form>
                        </div>
                    </div>
                
                    <div className="col2">
                        <h2>Add Match</h2>
                        <div className="form">
                            <form>
                                <p>Winner : Loser</p>
                                <input type="text" name="winner1" placeholder="<Winner 1>"/>
                                <input type="text" name="winner2" placeholder="<Winner 2>"/>
                                <input type="text" name="loser1" placeholder="<Loser 1>"/>
                                <input type="text" name="loser2" placeholder="<Loser 1>"/>
                        
                                <p>Game 1</p>
                                <input type="number" name="g1p1" placeholder="<Winner>"/>
                                <input type="number" name="g1p2" placeholder="<Loser>"/>
                        
                                <p>Game 2</p>
                                <input type="number" name="g2p1" placeholder="<Winner>"/>
                                <input type="number" name="g2p2" placeholder="<Loser>"/>
                        
                                <p>Game 3</p>
                                <input type="number" name="g3p1" placeholder="<Winner>"/>
                                <input type="number" name="g3p2" placeholder="<Loser>"/>
                                <br/>
                                <input type="submit" value="Add"/>
                            </form>
                        </div>
                    </div>
                </div>
    
                <div className="bar"/>
    
                <div>
                    <Rankings type={this.state.type} players={this.state.players}/>
                </div>
                <div>
                    <Games type={this.state.type} games={this.state.games}/>
                </div>
                <br/>
                </div>
            );
        }
    }

    state = {
        option: "ms",
        type: "singles",
        players: [],
        games: []
    }

    handleChange = (selectedOption) => {
        fetch("http://localhost:5000/setDB?dbName=" + selectedOption.value.toLowerCase()) // Get db based on selected value
            .then(res => res.json())
            .then((data) => {
                this.setState({ players: data.players })
                this.setState({ games: data.games })
            })
        
        this.setState({option: selectedOption.value.toLowerCase()});
        // Set game type to render either 1 or 2 players for forms
        if (selectedOption.value.toLowerCase() === "md" || selectedOption.value.toLowerCase() === "wd" || selectedOption.value.toLowerCase() === "xd") {
            this.setState({type: "doubles"});
        }
        else if (selectedOption.value.toLowerCase() === "ms" || selectedOption.value.toLowerCase() === "ws") {
            this.setState({type: "singles"});
        }
      }

    componentDidMount() {
        fetch("http://localhost:5000/setDB?dbName=" + this.state.option) // Get db based on selected value
            .then(res => res.json())
            .then((data) => {
                this.setState({ players: data.players })
                this.setState({ games: data.games})
            })
            .catch(console.log)
    }
}

export default Add;