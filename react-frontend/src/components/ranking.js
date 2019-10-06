import React from 'react';
import './ranking.css';

const Rankings = ({type, players}) => {
    if (type === "singles") {
        return (
            <div className="mainSingles"> 
                <div className="row1"> 
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
        );
    }

    else {
        return (
            <div className="mainDoubles"> 
                <div className="row1"> 
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
                            {player.name1}
                            <br/>
                            {player.name2}
                        </div>
                        <div className="col3">
                            {player.elo}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Rankings