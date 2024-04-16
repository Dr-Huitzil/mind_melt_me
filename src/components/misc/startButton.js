import React from "react";
import './styles/startButton.css';

const StartButton = ({ toggleStartMenu }) => {
    return (
        <button className="start-button" onClick={toggleStartMenu}>
            Start
        </button>
    );
};

export default StartButton;