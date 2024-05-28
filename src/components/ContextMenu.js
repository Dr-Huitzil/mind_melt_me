// ContextMenu.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ContextMenu.css';

const ContextMenu = ({ position, visible, onClose, onNewShortcut }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="context-menu" style={{ top: position.y, left: position.x }}>
            <div className="context-menu-item" onClick={onNewShortcut}>New Shortcut</div>
            <div className="context-menu-item" onClick={onClose}>Close</div>
        </div>
    );
};

ContextMenu.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onNewShortcut: PropTypes.func.isRequired,
};

export default ContextMenu;
