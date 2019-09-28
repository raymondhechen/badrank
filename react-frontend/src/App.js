import React from 'react';
import './App.css';

//import Select from 'react-select';
import NavBar from './components/header';
//import { options, groupStyles, groupBadgeStyles, formatGroupLabel } from './components/eventSelect';

const App = () => {
    return (
        <div className="main">
            <NavBar/>

            {/* <h1 className="selectTitle">Select Event:</h1>
            <div className="event">
                <Select
                    menuPlacement="auto"
                    defaultValue={options[0]}
                    options={options}
                    formatGroupLabel={formatGroupLabel}
                />  
            </div>  */}
        </div>
    );
}

export default App;