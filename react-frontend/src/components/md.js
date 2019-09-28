import React, { Component } from 'react';
import './body.css';
import Rankings from './ranking';

class MD extends Component {
    render() {
        return (
            <div className="main">
                <h1 className="title">MENS DOUBLES</h1>
                <h2 className="rankTitle">Ranking</h2>
                <Rankings players = {this.state.players}/>
                <h2 className="rankTitle">Games</h2>
            </div>
        );
    }

    state = {
        players: []
        //games: []
    }

    componentDidMount() {
        fetch('http://localhost:5000/setDB?dbName=md')
            .then(res => res.json())
            .then((data) => {
                this.setState({ players: data.players })
            })
            .catch(console.log)
    }
}

export default MD;