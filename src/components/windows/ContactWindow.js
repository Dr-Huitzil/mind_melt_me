import React from 'react';
import WindowFrame from './WindowFrame';

const ContactWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized }) => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText('media@mindmelt.org');
        alert('copied to clipboard');
    }

    const renderShortcutIcon = (emoji, url) => {
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className='contact-shortcut-icon-link'
        >
            <div className='contact-shortcut-icon-emoji'>{emoji}</div>
            {/* Classic Windows shortcut arrow */}
            <div className='contact-shortcut-arrow-container'>
                <span className="contact-shortcut-arrow">➔</span>
            </div>
        </a>
    };

    return (
        <WindowFrame
            title="Contact"
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 420, height: 230 }}
            minConstraints={{ width: 420, height: 230 }} // Fixed size similar to dialogs
        >
            <div className="contact-main-container">

                {/* Email Display Strip */}
                <div className="contact-inset-border">
                    <div className="contact-email-container">
                        <span className="contact-email-icon">🖷</span>
                        <span className="contact-email-text">media@mindmelt.org</span>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="contact-copy-button"
                    >
                        Copy
                    </button>
                </div>

                {/* Socials Group Box */}
                <fieldset className="contact-socials-fieldset">
                    <legend className="contact-socials-legend">
                        Socials
                    </legend>
                    <div className="contact-socials-container">
                        {/* Twitter or Spotify Substitute */}
                        {renderShortcutIcon('🎵', 'https://open.spotify.com/show/24egMNc90Wfn7rr5KWzlj1?si=0d2738b768944b99')}

                        {/* YouTube */}
                        {renderShortcutIcon('▶️', 'https://www.youtube.com/@mind.melt_')}

                        {/* Instagram */}
                        {renderShortcutIcon('📸', 'https://instagram.com/mind.melt_')}

                        {/* Store / Black Blob */}
                        {renderShortcutIcon('🧠', 'https://mindmelt-2.creator-spring.com/')}
                    </div>
                </fieldset>

            </div>
        </WindowFrame>
    );
};

export default ContactWindow;