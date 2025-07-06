import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/windows/about.css';
import MindMelt from '../html/mind-melt';

const About = ({ onClose }) => {
    const [state, setState] = useState({
        position: { x: 0, y: 0 },
        size: { width: 800, height: 600 },
        isMaximized: false,
        activeTab: 'mind-melt'
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
                : { width: 800, height: 600 },
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
                    minConstraints={[800, 600]}
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
                                <button className='window-control-close' onClick={onClose}>✕</button>
                            </div>
                        </div>

                        <div className="menu-bar">
                            <span className='menu-button'><u>F</u>ile</span>
                            <span className='menu-button'><u>E</u>dit</span>
                            <span className='menu-button'><u>V</u>iew</span>
                            <span className='menu-button'><u>H</u>elp</span>
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
                                <MindMelt />
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