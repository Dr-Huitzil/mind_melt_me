import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/Window.css';

const AboutWindow = ({ onClose }) => {
    const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 600, height: 400 });
    const [isMaximized, setIsMaximized] = useState(false);
    const [activeTab, setActiveTab] = useState('this-website');
    const windowRef = useRef(null);

    useEffect(() => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const boxHeight = 400;
        const boxWidth = 600;
        const x = (windowWidth - boxWidth) / 2;
        const y = (windowHeight - boxHeight) / 2;

        setWindowPosition({ x, y });
    }, []);

    const handleMinimize = () => {
        setWindowSize({ width: 200, height: 50 });
    };

    const handleMaximize = () => {
        if (isMaximized) {
            setWindowSize({ width: 600, height: 400 });
            setIsMaximized(false);
        } else {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            setWindowPosition({ x: 0, y: 0 });
            setIsMaximized(true);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Draggable handle=".window-title-bar">
            <div style={{ position: 'absolute', left: windowPosition.x, top: windowPosition.y }}>
                <ResizableBox
                    width={windowSize.width}
                    height={windowSize.height}
                    minConstraints={[400, 300]}
                    maxConstraints={[window.innerWidth, window.innerHeight]}
                    handle={
                        <div className="react-resizable-handle"></div>
                    }
                >
                    <div className="window" ref={windowRef}>
                        <div className="window-title-bar">
                            <span className="window-title">About</span>
                            <div className="window-buttons">
                                <button className="window-button" onClick={handleMinimize}>_</button>
                                <button className="window-button" onClick={handleMaximize}>
                                    {isMaximized ? (
                                        <span className="restore-icon"></span>
                                    ) : (
                                        <span className="maximize-icon"></span>
                                    )}
                                </button>
                                <button className="window-button" onClick={onClose}>X</button>
                            </div>
                        </div>
                        <div className="menu-bar">
                            <span className="menu-button">File</span>
                            <span className="menu-button">Edit</span>
                            <span className="menu-button">View</span>
                        </div>
                        <div className="address-bar">
                            <span>Address:</span>
                            <input type="text" value="https://mindmelt.org/about" readOnly />
                        </div>
                        <div className="tabs">
                            <div className={`tab ${activeTab === 'this-website' ? 'active' : ''}`} onClick={() => handleTabClick('this-website')}>
                                This Website
                            </div>
                            <div className={`tab ${activeTab === 'about-me' ? 'active' : ''}`} onClick={() => handleTabClick('about-me')}>
                                About Me
                            </div>
                        </div>
                        <div className={`tab-content ${activeTab === 'this-website' ? 'active' : ''}`}>
                            <h2>Welcome to Mind Melt</h2>
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

                                There are features on this website that are inspired by the Windows 95 operating system. Some of the features include:
                            </p>
                            <ul>
                                <li>draggable windows</li>
                                <li>tabs in the 'About' window</li>
                                <li>minimizable/maximizable windows</li>
                                <li>a music player</li>
                                <li>button along the bottom that corresponds with whether window is active or not</li>
                                <li>an instagram widget</li>
                                <li>toggle menu</li>
                                <li>clock</li>
                            </ul>
                        </div>
                        <div className={`tab-content ${activeTab === 'about-me' ? 'active' : ''}`}>
                            <h2>About Us</h2>
                            <img src="./me.jpeg" style={{ width: '230px', float: 'left', borderRadius: '50% 50% 10% 10%', marginRight: '16px' }} alt="Me" />
                            <p>
                                Hello!
                            </p>
                            <p>
                                This website was coded, designed and illustrated by Ivan. If you have any questions or would like to collaborate, please feel free to reach out to me at my instagram @prof.quetzal or email me at ialierreyes@gmail.com
                            </p>
                        </div>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default AboutWindow;
