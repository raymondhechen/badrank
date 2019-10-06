import React from 'react';
import './games.css';

const Games = ({type, games}) => {
    if (type === "singles") {
        return (
            <div className="container">
                {games.map((game) =>
                    <div className="card">
                        <h3>{game.p1} : {game.p2}</h3>
                        <h4>{game.g1p1} : {game.g1p2}</h4>
                        <h4>{game.g2p1} : {game.g2p2}</h4>
                        {game.g3p1>0 && game.g3p2>0 ?
                            <h4>{game.g3p1} : {game.g3p2}</h4> : null
                        }
                    </div>
                )}
            </div>
        );
    }
    else {
        return (
            <div className="container">
            {games.map((game) =>
                <div className="card">
                    <h3>{game.p11}, {game.p12}</h3>
                    <h3>{game.p21}, {game.p22}</h3>
                    <h4>{game.g1p1} : {game.g1p2}</h4>
                    <h4>{game.g2p1} : {game.g2p2}</h4>
                    {game.g3p1>0 && game.g3p2>0 ?
                        <h4>{game.g3p1} : {game.g3p2}</h4> : null
                    }
                </div>
            )}
        </div>  
        );
    }
}

export default Games