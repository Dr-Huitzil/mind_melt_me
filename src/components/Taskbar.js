import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Taskbar.css';

const Taskbar = ({ runningApps, onAppClick }) => {
    useEffect(() => {
        function updateClock() {
            const clockElement = document.getElementById('clock');
            if (clockElement) {
                const now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';

                hours = hours % 12;
                hours = hours ? hours : 12; // The hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;

                const strTime = hours + ':' + minutes + ' ' + ampm;
                clockElement.innerHTML = strTime;
            }
        }

        // Update the clock every minute
        setInterval(updateClock, 1000);
        updateClock(); // Initial call to set the time immediately
    }, []);

    return (
        <div className="taskbar">
            <div className="taskbar-icons">
                {runningApps.map((app, index) => (
                    <button
                        key={index}
                        className={`taskbar-icon ${app.minimized ? '' : 'active'}`}
                        onClick={() => onAppClick(app)}
                    >
                        {app}
                    </button>
                ))}
            </div>
            <div className="taskbar-time" id="clock">
                12:00 PM
            </div>
        </div>
    );
};

Taskbar.propTypes = {
    runningApps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            minimized: PropTypes.bool.isRequired
        })
    ).isRequired,
    onAppClick: PropTypes.func.isRequired
};

export default Taskbar;
