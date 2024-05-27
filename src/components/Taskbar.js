// Taskbar.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Taskbar.css';

const Taskbar = ({ runningApps, onAppClick }) => {
    return (
        <div className="taskbar">
            <button className='start-button' onClick={onAppClick}>
                Start
            </button>
            <div className="bar-buttons">
                {runningApps.map(app => (
                    <button
                        key={app}
                        className="bar-button"
                        onClick={() => onAppClick(app)}
                    >
                        {app}
                    </button>
                ))}
            </div>
            <div className="clock">{new Date().toLocaleTimeString()}</div>
        </div>
    );
};

Taskbar.propTypes = {
    runningApps: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAppClick: PropTypes.func.isRequired,
};

export default Taskbar;
