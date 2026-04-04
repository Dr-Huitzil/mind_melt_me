import React, { useState, useEffect, useRef } from "react";
import { useWindowState, useWindowActions } from '../contexts/WindowContext';
import '../styles/Taskbar.css'
import Clock from "./Clock";
import { startMenuItems } from '../config/apps.config';

const Taskbar = () => {
    const { runningApp } = useWindowState();
    const { handleOpenWindow, handleMinimizeWindow } = useWindowActions();

    //state for start menu visibility
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [showAllApps, setShowAllApps] = useState(false);
    const startMenuRef = useRef(null);
    const startButtonRef = useRef(null);

    const handleLaunch = (name, props = {}) => {
        handleOpenWindow(name, props);
        setIsStartMenuOpen(false);
        setShowAllApps(false);
    };

    const handleAppClick = (app) => {
        if (app.minimized) {
            handleOpenWindow(app.name, { initialPath: app.initialPath });
        } else {
            handleMinimizeWindow(app.id);
        }
    };


    //Toggle start menu visibility
    const toggleStartMenu = () => {
        setIsStartMenuOpen(!isStartMenuOpen);
    }

    //Close start menu on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isStartMenuOpen &&
                startMenuRef.current && !startMenuRef.current.contains(event.target) &&
                startButtonRef.current && !startButtonRef.current.contains(event.target)) {
                setIsStartMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isStartMenuOpen]);

    return (
        <div className="taskbar-container">
            {/* Taskbar */}
            <div className="taskbar">
                {/* Start Menu */}
                <button
                    ref={startButtonRef}
                    className="start-button"
                    onClick={toggleStartMenu}
                    aria-expanded={isStartMenuOpen}
                    aria-label="Start Menu"
                >
                    <span style={{ fontStyle: 'normal', fontSize: '18px', marginRight: '6px', filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}>🪟</span> start
                </button>

                {/* running apps */}
                <div className="taskbar-icons">
                    {runningApp.map((app) => (
                        <button
                            key={app.id}
                            className={`taskbar-icon ${app.minimized ? '' : 'active'}`}
                            onClick={() => handleAppClick(app)}
                            aria-label={`Switch to ${app.name}`}
                        >
                            <span style={{ marginRight: '6px', fontSize: '14px' }}>📁</span>
                            {app.name}
                        </button>
                    ))}
                </div>

                {/* Credit */}
                <div className="taskbar-credit">
                    site dawned by the <a style={{ color: 'white', textDecoration: 'underline' }} href="https://willofhuitzil.com" target="_blank" rel="noopener noreferrer">
                        Will of Huitzil
                    </a>
                </div>

                {/* Clock */}
                <Clock />
            </div>

            {/* Start Menu Popup */}
            {isStartMenuOpen && (
                <div className="start-menu" ref={startMenuRef}>
                    <div className="start-strip">
                        <div className="start-strip-rotate">Mind Melt OS </div>
                    </div>

                    <div className="start-menu-text">

                        <div
                            className="menu-child submenu-trigger"
                            onMouseEnter={() => setShowAllApps(true)}
                            onMouseLeave={() => setShowAllApps(false)}
                            aria-expanded={showAllApps}
                        >

                            <span className="menu-icon">📁</span>
                            <span className="menu-text" style={{ fontWeight: 'bold' }}>Programs</span>
                            <span className="submenu-arrow">▶</span>

                            {showAllApps && (
                                <div className="all-apps-submenu">
                                    {startMenuItems.map(app => (
                                        <div
                                            key={app.id}
                                            className="menu-child"
                                            onClick={() => handleLaunch(app.windowName, app.props || {})}
                                        >

                                            <span className="menu-icon">{app.taskbarIcon}</span>
                                            <span className="menu-icon">{app.displayName}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="menu-divider" />

                        <a className="menu-child" href="https://open.spotify.com/show/24egMNc90Wfn7rr5KWzlj1?si=0d2738b768944b99" target="_blank" rel="noopener noreferrer"><span className="menu-icon">🎵</span><span className="menu-text">Spotify</span></a>
                        <a className="menu-child" href="https://www.youtube.com/@mind.melt_" target="_blank" rel="noopener noreferrer"><span className="menu-icon">▶️</span><span className="menu-text">YouTube</span></a>
                        <a className="menu-child" href="https://instagram.com/mind.melt_" target="_blank" rel="noopener noreferrer"><span className="menu-icon">📸</span><span className="menu-text">Instagram</span></a>
                        <a className="menu-child" href="https://www.tiktok.com/@melted.minds_?_r=1&_t=ZT-94t80ja56Uv" target="_blank" rel="noopener noreferrer"><span className="menu-icon">📱</span><span className="menu-text">TikTok</span></a>
                        <a className="menu-child" href="https://mindmelt-2.creator-spring.com/" target="_blank" rel="noopener noreferrer"><span className="menu-icon">🛒</span><span className="menu-text">Shop</span></a>
                        <div className="menu-divider" />
                        <a className="menu-child" href="mailto:media@mindmelt.org" target="_blank" rel="noopener noreferrer"><span className="menu-icon">📧</span><span className="menu-text">Email</span></a>
                        <div className="menu-child" onClick={() => handleLaunch('Contact', {})}><span className="menu-icon">📇</span><span className="menu-text">Contact</span></div>
                        <div className="menu-divider" />
                        <div className="menu-child" onClick={() => handleLaunch('Settings', {})}><span className="menu-icon">⚙️</span><span className="menu-text">Settings</span></div>
                        <div className="menu-child" onClick={() => handleLaunch('PowerOptions', {})}><span className="menu-icon">⏻</span><span className="menu-text">Power Settings</span></div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(Taskbar);