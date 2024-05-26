import React from 'react';
import '../styles/Desktop.css';
import meIcon from "../assets/desktop-icons/me-icon.png";

const icons = [
    { id: 1, src: meIcon, name: 'My Icon', action: () => alert('My Icon Clicked') },
];

const Desktop = ({ onIconClick }) => {
    return (
        <div className='desktop-bg'>
            <div className='desk-icons-wrapper'>
                {icons.map(icon => (
                    <div key={icon.id} className='desktop-icon' onClick={() => onIconClick(icon)}>
                        <img src={icon.src} alt={icon.name} />
                        <span className='icon-text'>{icon.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Desktop;