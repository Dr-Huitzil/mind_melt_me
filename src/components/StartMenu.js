import React from 'react';
import "../styles/StartMenu.css"

const StartMenu = ({ onClose }) => {
    return (
        <div className='start-menu'>
            <div className='start-strip'>
                <div className='start-text-rotate'> Mind Melt OS </div>
            </div>
            <div className="start-menu-text">
                <a className="menu-child" href="#!" onClick={onClose}>Mind Melt</a>
                <hr />
                <a className="menu-child" href="#!" onClick={onClose}>Programs</a>
                <hr />
                <a className="menu-child" href="#!" onClick={onClose}>Documents</a>
                <hr />
                <a className="menu-child" href="#!" onClick={onClose}>Settings</a>
                <hr />
                <a className="menu-child" href="#!" onClick={onClose}>Links</a>
                <hr />
                <a className="menu-child" href="#!" onClick={onClose}>Sign In</a>
                <hr />
                <a className="menu-child" href="#!" onClick={onClose}>Log Off</a>
                <hr />
                <a className="menu-child" href="#!" onClick={onClose}>Shut Down</a>
            </div>
        </div>
    );
};

export default StartMenu;