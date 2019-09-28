import React from 'react';
import './ranking.css';

const Rankings = ({players}) => {
    return (
        <div className="main"> 
            <div className="row"> 
                <div className="col1">
                    <h3>Rank</h3>
                </div>
                <div className="col2">
                    <h3>Name</h3>
                </div>
                <div className="col3">
                    <h3>Elo</h3>
                </div>
            </div>
            {players.map((player) => (
                <div className="row"> 
                    <div className="col1">
                        {players.indexOf(player)+1} {/* Index+1 is rank since sorted in order */}
                    </div>
                    <div className="col2">
                        {player.name}
                    </div>
                    <div className="col3">
                        {player.elo}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Rankings