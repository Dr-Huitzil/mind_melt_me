import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../styles/taskbarwstart.css';

const TaskbarwStart = ({ runningApps, onAppClick }) => {
    //State for start menu visibility
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

    //state for clock functionality
    const [currentTime, setCurrentTime] = useState('12:00 PM');

    //Toggle start menu visibility
    const toggleStartMenu = () => {
        setIsStartMenuOpen(!isStartMenuOpen);
    };

    //close Start Menu
    const closeStartMenu = () => {
        setIsStartMenuOpen(false);
    };

    //Clock update effect
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours || 12; // The hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;

            setCurrentTime(`${hours}:${minutes} ${ampm}`);
        };

        const timer = setInterval(updateClock, 1000);
        updateClock(); // Initial call to set the time immediatelly
        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="taskbar-container">
            {/* Taskbar */}
            <div className="taskbar">
                {/* Start Menu */}
                <button
                    className="start-button"
                    onClick={toggleStartMenu}
                    aria-expanded={isStartMenuOpen}
                    aria-label="Start Menu"
                >
                    Start
                </button>

                {/* running running */}
                <div className="taskbar-icons">
                    {runningApps.map((app) => (
                        <button
                            key={app.id}
                            className={`taskbar-icon ${app.minimized ? '' : 'active'}`}
                            onClick={() => onAppClick(app)}
                            aria-label={'Switch to ${app.name}'}
                        >
                            {app.name}
                        </button>
                    ))}
                </div>

                {/* Clock */}
                <div className="taskbar-clock" aria-live="off">
                    {currentTime}
                </div>
            </div>

            {/* Start Menu Popup */}
            {isStartMenuOpen && (
                <div className="start-menu">
                    <div className="start-strip">
                        <div className="start-strip-rotate">Mind Melt OS</div>
                    </div>
                    <div className="start-menu-text">
                        <a className="menu-child" href="https://open.spotify.com/show/24egMNc90Wfn7rr5KWzlj1?si=0d2738b768944b99" target="_blank" rel="noopener noreferrer">Spotify</a>
                        <hr />
                        <a className="menu-child" href="https://www.youtube.com/@mind.melt_" target="_blank" rel="noopener noreferrer">YouTube</a>
                        <hr />
                        <a className="menu-child" href="https://instagram.com/mind.melt_" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <hr />
                        <a className="menu-child" href="https://mindmelt-2.creator-spring.com/" target="_blank" rel="noopener noreferrer">Shop</a>
                        <hr />
                        <a className="menu-child" href="mailto:media@mindmelt.org" target="_blank" rel="noopener noreferrer">Email</a>
                        <hr />
                    </div>
                </div>
            )}
        </div>
    );
};

TaskbarwStart.propTypes = {
    runningApps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            minimized: PropTypes.bool.isRequired
        })
    ).isRequired,
    onAppClick: PropTypes.func.isRequired
};
export default TaskbarwStart;