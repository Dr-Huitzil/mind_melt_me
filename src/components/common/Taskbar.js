import React from "react";
import './style/taskbar.css';

import StartButton from "../misc/startButton";
import StartMenu from "./StartMenu";
import TimeDisplay from "../misc/timeDisplay";

export default function Taskbar({ children }) {
    const [startMenuVisible, setStartMenuVisible] = React.useState(false);
    const toggleStartMenu = () => setStartMenuVisible(!startMenuVisible);

    return (
        <div className="taskbar">
            <StartButton toggleStartMenu={toggleStartMenu} />
            {startMenuVisible && <StartMenu />}
            <TimeDisplay />
        </div>
    );
};
