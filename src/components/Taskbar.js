import React from 'react';
import '../styles/Taskbar.css';

const Taskbar = ({ runningApps }) => {
    return (
        <div className='taskbar'>
            <div className='bar-button'>
                {runningApps.map(app => (
                    <button key={app.id} className='bar-button' onClick={app.action}>
                        {app.name}
                    </button>
                ))}
            </div>
            <span id='clock'>{new Date().toLocaleDateString()}</span>
        </div>
    );
};

export default Taskbar;