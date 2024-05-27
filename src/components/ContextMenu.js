import React from 'react';
import '../styles/ContextMenu.css';

const ContextMenu = ({ position, visible, onClose, onNewShortcut }) => {
    if (!visible) return null;

    return (
        <div className='context-menu' style={{ top: position.y, left: position.x }} onClick={onClose}>
            <ul>
                <li onClick={onNewShortcut}>New Shortcut</li>
                <li onClick={onClose}>Change Background</li>
                <li onClick={onClose}>Refresh</li>
            </ul>
        </div>
    );
};

export default ContextMenu;