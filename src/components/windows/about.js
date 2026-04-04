import React, { useState } from 'react';
import WindowFrame from './WindowFrame';
import '../../styles/windows/about.css';
import MindMelt from '../html/mind-melt';

const About = ({ onClose, onMinimize, zIndex, onFocus, minimized }) => {
    const [activeTab, setActiveTab] = useState('mind-melt');

    const tabs = [
        { id: 'mind-melt', label: 'Mind Melt' },
        { id: 'members', label: 'Members' }
    ];

    //Refactor: MenuBarItems are passed directly to the windowFrame which handles rendering
    const menuBarItems = [
        { label: <span><u>F</u>ile</span> },
        { label: <span><u>E</u>dit</span> },
        { label: <span><u>V</u>iew</span> },
        { label: <span><u>H</u>elp</span> },
    ];

    return (
        // Refactor remeoved hundreds of lines of Draggable/ResizableBox limit code in favor of reusable WindowFrame.
        <WindowFrame title="About" minimized={minimized} onClose={onClose} onMinimize={onMinimize} zIndex={zIndex} onFocus={onFocus} menuBarItems={menuBarItems}>
            <div className='address-bar'>
                <span>Address:</span>
                <input type='text' value="https://mindmelt.org/about" readOnly />
            </div>

            <div className='tab-bar'>
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            {activeTab === 'mind-melt' && (
                <MindMelt />
            )}

            {activeTab === 'members' && (
                <div className='no-padding'>
                    <h2>Meet the Team</h2>
                </div>
            )}
        </WindowFrame>
    );
};

export default About;