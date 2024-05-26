import React from 'react';
import "../styles/StartMenu.css"

const StartMenu = ({ onClose }) => {
    return (
        <div className='start-menu'>
            <div className='start-strip'>
                <div className='start-text-rotate'> Mind Melt OS </div>
            </div>
            <div className="start-menu-text">
                <a className="menu-child" href="https://open.spotify.com/show/24egMNc90Wfn7rr5KWzlj1?si=0d2738b768944b99" target="_blank" rel="noopener noreferrer">Spotify</a>
                <hr />
                <a className="menu-child" href="https://instagram.com/mind.melt_" target="_blank" rel="noopener noreferrer">Instagram</a>
                <hr />
                <a className="menu-child" href="https://mindmelt.shop/" target="_blank" rel="noopener noreferrer">Shop</a>
            </div>
        </div>
    );
};

export default StartMenu;