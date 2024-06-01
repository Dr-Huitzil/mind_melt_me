// src/components/windows/AboutWindow.js
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/Window.css';

const AboutWindow = ({ onClose }) => {
    const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 400, height: 300 });
    const [isMaximized, setIsMaximized] = useState(false);
    const windowRef = useRef(null);

    useEffect(() => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const boxHeight = 300;
        const boxWidth = 400;
        const x = (windowWidth - boxWidth) / 2;
        const y = (windowHeight - boxHeight) / 2;

        setWindowPosition({ x, y });
    }, []);

    const handleMinimize = () => {
        setWindowSize({ width: 200, height: 50 });
    };

    const handleMaximize = () => {
        if (isMaximized) {
            setWindowSize({ width: 400, height: 300 });
            setIsMaximized(false);
        } else {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            setWindowPosition({ x: 0, y: 0 });
            setIsMaximized(true);
        }
    };

    return (
        <Draggable handle=".window-title-bar">
            <div style={{ position: 'absolute', left: windowPosition.x, top: windowPosition.y }}>
                <ResizableBox
                    width={windowSize.width}
                    height={windowSize.height}
                    minConstraints={[300, 200]}
                    maxConstraints={[window.innerWidth, window.innerHeight]}
                    className="resizable-box"
                >
                    <div className="window" ref={windowRef}>
                        <div className="window-title-bar">
                            <span className="window-title">About</span>
                            <div>
                                <button className="window-minimize-button" onClick={handleMinimize}>_</button>
                                <button className="window-maximize-button" onClick={handleMaximize}>{isMaximized ? '[]' : '[][]'}</button>
                                <button className="window-close-button" onClick={onClose}>X</button>
                            </div>
                        </div>
                        <div className="window-content">
                            <h2>Mind Melt</h2>
                            <p>
                                What exactly is Mind Melt? You may have heard of us or seen our stickers scattered
                                around campus but do you ever question what Mind Melt is supposed to be? Mind Melt is
                                the melting of ideas, a creative outlet, that encourages people and students to express
                                themselves creatively. It all started with a simple radio show on [Otter Media] hosted
                                on the CSUMB channel, The Current back in the fall of 2022. It has slowly grown into a
                                much greater community that has a passion for music, art, and creativity. We are a group
                                of students that are passionate about music and art and we want to share that passion with
                                whoever finds us. It all began with music but we are slowly expanding our mind-melting ideas
                                into the realms of fashion, photography, and many other creative fields.
                            </p>
                        </div>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default AboutWindow;
