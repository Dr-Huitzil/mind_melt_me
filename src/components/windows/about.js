import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/windows/about.css';

const About = ({ onClose }) => {
    const [state, setState] = useState({
        position: { x: 0, y: 0 },
        size: { width: 600, height: 400 },
        isMaximized: false,
        activeTab: 'this-website'
    });

    const windowRef = useRef(null);

    useEffect(() => {
        const { innerHeight, innerWidth } = window;
        setState(prev => ({
            ...prev,
            position: {
                x: (innerWidth - prev.size.width) / 2,
                y: (innerHeight - prev.size.height) / 2
            }
        }));
    }, []);

    const handleResize = (isMaximized) => {
        const { innerHeight, innerWidth } = window;
        setState(prev => ({
            ...prev,
            size: isMaximized
                ? { width: innerWidth, height: innerHeight }
                : { width: 600, height: 400 },
            position: isMaximized ? { x: 0, y: 0 } : prev.position,
            isMaximized
        }));
    };

    const tabs = [
        { id: 'mind-melt', label: 'Mind Melt' },
        { id: 'members', label: 'Members' }
    ];

    return (
        <Draggable handle=".window-header">
            <div style={{
                position: 'absolute',
                left: state.position.x,
                top: state.position.y
            }}>
                <ResizableBox
                    width={state.size.width}
                    height={state.size.height}
                    minConstraints={[400, 300]}
                    maxConstraints={[window.innerWidth, window.innerHeight]}
                    handle={
                        <div className="react-resizable-handle"></div>
                    }
                >
                    <div className="window" ref={windowRef}>
                        <div className='window-header'>
                            <h3 className='no-margin'>About</h3>
                            <div className="window-controls">
                                <button className='window-control' onClick={() => handleResize(false)}>_</button>
                                <button className='window-control' onClick={() => handleResize(!state.isMaximized)}>
                                    {state.isMaximized ? '🗗' : '🗖'}
                                </button>
                                <button className='window-control' onClick={onClose}>✕</button>
                            </div>
                        </div>

                        <div className="menu-bar">
                            <span className='menu-button'>File</span>
                            <span className='menu-button'>Edit</span>
                            <span className='menu-button'>View</span>
                            <span className='menu-button'>Help</span>
                        </div>

                        <div className='address-bar'>
                            <span>Address:</span>
                            <input type='text' value="https://mindmelt.org/about" />
                        </div>

                        <div className='window-body'>
                            <div className='tab-bar'>
                                {tabs.map(tab => (
                                    <div
                                        key={tab.id}
                                        className={`tab ${state.activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setState(prev => ({ ...prev, activeTab: tab.id }))}
                                    >
                                        {tab.label}
                                    </div>
                                ))}
                            </div>

                            {state.activeTab === 'mind-melt' && (
                                <div className='no-padding'>
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
                            )}

                            {state.activeTab === 'members' && (
                                <div className='no-padding'>
                                    <h2>Meet the Team</h2>
                                </div>
                            )}

                        </div>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default About;