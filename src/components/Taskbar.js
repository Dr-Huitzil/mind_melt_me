import React from 'react';
import '../styles/Taskbar.css';

const Taskbar = ({ runningApps, onAppClick }) => {
    return (
        <div className='taskbar'>
            <div className='bar-button'>
                {runningApps.map(app => (
                    <button
                        key={app.id}
                        className={`bar-button ${app.active ? 'active' : ''}`}
                        onClick={() => onAppClick(app.id)}
                    >
                        {app.name}
                    </button>
                ))}
            </div>
            <span id='clock'>{new Date().toLocaleDateString()}</span>
        </div>
    );
};

export default Taskbar;