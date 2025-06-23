import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Desktop.css';

const icons = [
    { id: 'about', name: 'About', icon: require('../assets/desktop-icons/me-icon.png') },
    { id: 'chat', name: 'Chatbox', icon: require('../assets/desktop-icons/kirby1.jpg') },
    { id: 'calculator', name: 'Calculator', icon: require('../assets/desktop-icons/kirby2.jpg') },
    { id: 'shop', name: 'Shop', icon: require('../assets/desktop-icons/kirby3.png') },
    { id: 'contact', name: 'Contact', icon: require('../assets/desktop-icons/kirby4.jpg') },
    { id: 'music', name: 'Music', icon: require('../assets/desktop-icons/kirby5.jpg') },
    { id: 'video', name: 'Video', icon: require('../assets/desktop-icons/kirby6.png') },
    { id: 'games', name: 'Games', icon: require('../assets/desktop-icons/kirby1.jpg') },
    { id: 'images', name: 'Images', icon: require('../assets/desktop-icons/kirby2.jpg') },
    { id: 'the-lore', name: 'The Lore', icon: require('../assets/desktop-icons/kirby3.png') },
    { id: 'notepad', name: 'Notepad', icon: require('../assets/desktop-icons/kirby4.jpg') },
    { id: 'faq', name: 'FAQ', icon: require('../assets/desktop-icons/kirby5.jpg') },
    { id: 'more-links', name: 'More Links', icon: require('../assets/desktop-icons/kirby5.jpg') },
    { id: 'blog', name: 'Blog', icon: require('../assets/desktop-icons/kirby6.png') }
];

const Desktop = ({ onIconClick }) => {
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        position: { x: 0, y: 0 }
    });

    const handleRightClick = (event) => {
        event.preventDefault();
        setContextMenu({
            visible: true,
            position: { x: event.clientX, y: event.clientY }
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    };

    const handleNewShortcut = () => {
        handleCloseContextMenu();
        console.log('New Shortcut');
    };

    return (
        <div
            className="desktop"
            onContextMenu={handleRightClick}
            onClick={handleCloseContextMenu}
        >
            {icons.map(({ id, name, icon }) => (
                <div
                    key={id}
                    className='desktop-icon'
                    onClick={() => onIconClick(id)}
                    role='button'
                    tabIndex={0}
                >
                    <img src={icon} alt={name} loading='lazy' />
                    <span>{name}</span>
                </div>
            ))}

            <contextMenu
                position={contextMenu.position}
                visible={contextMenu.visible}
                onClose={handleCloseContextMenu}
                onNewShortcut={handleNewShortcut}
            />
        </div>
    );
};

Desktop.propTypes = {
    onIconClick: PropTypes.func.isRequired
};

export default Desktop;
