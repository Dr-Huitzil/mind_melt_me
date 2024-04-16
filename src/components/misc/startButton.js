import React from "react";
import './styles/startButton.css';
import logoSrc from './imgs/brain-logo.png';

const StartButton = ({ toggleStartMenu }) => {
    return (
        <button className="start-button" onClick={toggleStartMenu}>
            <img src={logoSrc} alt="logo" className="start-button-logo" />
            Start
        </button>
    );
};

export default StartButton;