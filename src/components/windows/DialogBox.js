import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../../styles/windows/about.css';
import '../../styles/windows/DialogBox.css';

/**
 * A reusable Dialog Box component mimicking classic Windows OS error/alert dialogues.
 * 
 * @param {string} title - Text displayed in the dialogue's title bar
 * @param {string|ReactNode} message - The main warning/error/info text
 * @param {string} icon - Type of icon: 'error', 'warning', 'info', 'question', 'none'
 * @param {array} buttons - Array of button objects, e.g., [{ label: 'OK', onClick: () => ... }, { label: 'Cancel' }]
 * @param {function} onClose - Triggered when the top-right "X" is clicked (or default action for fallback buttons)
 * @param {number} zIndex - Stacking order
 */

const DialogBox = ({
    title = "Message",
    message = "An error has occured",
    icon = 'error',
    buttons = [{ label: "OK" }], // default to a single button
    onClose,
    zIndex = 2000,
    defaultPosition
}) => {
    // Center it by default if no position provided
    const [position, setPosition] = useState(defaultPosition || {
        // try to position in the center of the screen
        x: Math.max(0, window.innerWidth / 2 - 175),
        y: Math.max(0, window.innerHeight / 2 - 100)
    });

    const renderIcon = () => {
        // Can be swapped out with real windows 95 icons
        switch (icon) {
            case 'error': return <span className="dialog-icon dialog-icon-error">❌</span>;
            case 'warning': return <span className="dialog-icon">⚠️</span>;
            case 'question': return <span className="dialog-icon dialog-icon-question">❓</span>;
            case 'info': return <span className="dialog-icon dialog-icon-info">ℹ️</span>;
            case 'cd': return <span className="dialog-icon">💿</span>;
            case 'keyboard': return <span className="dialog-icon">⌨️</span>;
            case 'printer': return <span className="dialog-icon">🖨️</span>;
            default: return null;
        }
    };

    return (
        <Draggable
            handle=".window-header"
            bounds="parent" // Dialogs should stay well within the screen viewport
            position={position}
            onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
        >
            <div
                className="dialog-box-container"
                style={{ zIndex: zIndex }}
            >
                {/* Title Bar - Dialogs usually only have the Close button natively */}
                <div className='window-header dialog-box-header'>
                    <h3 className='no-margin dialog-box-title'>{title}</h3>
                    <div className="window-controls">
                        <button
                            className='window-control-close dialog-box-close-btn'
                            onClick={onClose}
                        >✕</button>
                    </div>
                </div>

                {/* Dialog Body */}
                <div className='window-body dialog-box-body'>
                    {/* Content Section (Icon + Text) */}
                    <div className="dialog-box-content">
                        {renderIcon()}
                        <div className={`dialog-box-text ${icon && icon !== 'none' ? 'with-icon' : ''}`}>
                            {message}
                        </div>
                    </div>

                    {/* Buttons Area */}
                    <div className="dialog-box-buttons">
                        {buttons.map((btn, index) => (
                            <button
                                key={index}
                                className="dialog-box-btn"
                                onClick={btn.onClick || onClose}
                                style={btn.style || {}}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default DialogBox;