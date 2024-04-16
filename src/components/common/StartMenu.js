import React from "react";
import './style/startmenu.css';

const StartMenu = () => {
    return (
        <div className="start-menu">
            <ul className="menu-list">
                <li>Mind Melt</li>
                <li className="menu-separator"></li>
                <li>Programs</li>
                <li>Documents</li>
                <li>Settings</li>
                <li>Links</li>
                <li className="menu-separator"></li>
                <li>Sign In / Log Off</li>
                <li>Shut Down</li>
            </ul>
        </div>
    );
};

export default StartMenu;