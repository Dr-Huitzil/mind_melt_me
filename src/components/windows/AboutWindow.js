import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/Window.css';

const AboutWindow = ({ onClose }) => {
    const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
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

    return (
        <Draggable handle=".window-title-bar" defaultPosition={windowPosition}>
            <ResizableBox
                width={400}
                height={300}
                minConstraints={[300, 200]}
                maxConstraints={[600, 400]}
                className="resizable-box"
            >
                <div className="window" ref={windowRef}>
                    <div className="window-title-bar">
                        <span className="window-title">About</span>
                        <button className="window-close-button" onClick={onClose}>X</button>
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
        </Draggable>
    );
};

export default AboutWindow;
