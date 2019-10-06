import React, { Component } from 'react';
import './body.css';
import Rankings from './ranking';
import Games from './games';

class MD extends Component {
    render() {
        return (
            <div className="main">
                <h1 className="title">MENS DOUBLES</h1>
                <h2 className="rankTitle">Ranking</h2>
                <Rankings type={this.state.type} players={this.state.players}/>
                <br/>
                <br/>
                <br/>
                <div className="bottom">
                    <h2 className="rankTitle">Games</h2>
                    <Games type={this.state.type} games={this.state.games}/>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }

    state = {
        type: "doubles",
        players: [],
        games: []
    }

    componentDidMount() {
        fetch('http://localhost:5000/setDB?dbName=md')
            .then(res => res.json())
            .then((data) => {
                this.setState({ players: data.players })
                this.setState({ games: data.games })
            })
            .catch(console.log)
    }
}

export default MD;