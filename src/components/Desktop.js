import React from 'react';
import '../styles/Desktop.css';

const Desktop = ({ onIconClick }) => {
    const icons = [
        { id: 'about', name: 'About', icon: require('../assets/desktop-icons/me-icon.png') },
        { id: 'chat', name: "Chatbox", icon: require('../assets/desktop-icons/kirby1.jpg') },
        { id: 'calculator', name: 'Calculator', icon: require('../assets/desktop-icons/kirby2.jpg') },
        { id: 'shop', name: 'Shop', icon: require('../assets/desktop-icons/kirby3.png') },
        { id: 'contact', name: 'Contact', icon: require('../assets/desktop-icons/kirby4.jpg') },
        { id: 'music', name: 'Music', icon: require('../assets/desktop-icons/kirby5.jpg') },
        { id: 'video', name: 'Video', icon: require('../assets/desktop-icons/kirby6.png') },
        { id: 'games', name: 'Games', icon: require('../assets/desktop-icons/kirby1.jpg') },
        { id: 'images', name: 'Images', icon: require('../assets/desktop-icons/kirby2.jpg') },
        { id: 'the lore', name: 'The Lore', icon: require('../assets/desktop-icons/kirby3.png') },
        { id: 'notepad', name: 'Notepad', icon: require('../assets/desktop-icons/kirby4.jpg') },
        { id: 'faq', name: 'FAQ', icon: require('../assets/desktop-icons/kirby5.jpg') },
        { id: 'moreLinks', name: 'More Links', icon: require('../assets/desktop-icons/kirby1.jpg') },
        { id: 'Blog', name: 'Blog', icon: require('../assets/desktop-icons/kirby6.png') }
    ];

    return (
        <div className="desktop">
            {icons.map(icon => (
                <div
                    key={icon.id}
                    className="desktop-icon"
                    onClick={() => onIconClick(icon.id)}
                >
                    <img src={icon.icon} alt={icon.name} />
                    <span>{icon.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Desktop;