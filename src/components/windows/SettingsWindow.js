import React, { useState } from 'react';
import WindowFrame from './WindowFrame';
import '../../styles/windows/SettingsWindow.css';

const presetWallpapers = [
    { name: '(None)', url: '' },
    { name: 'Default Ocean Duck', url: require('../../assets/background/testdk.jpg') },
    { name: 'Bliss', url: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_background%29.jpg' },
    { name: 'Crystal', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80' },
    { name: 'Coffee Bean', url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80' }
];

const SettingsWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized, setWallpaper }) => {
    const [selectedPreset, setSelectedPreset] = useState(presetWallpapers[1]);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [customUrl, setCustomUrl] = useState('');

    const handleApply = () => {
        if (setWallpaper) {
            setWallpaper(isUnlocked ? customUrl : selectedPreset.url);
        }
    };

    const handleOk = () => {
        handleApply();
        onClose();
    };

    const handlePasswordSubmit = async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(passwordInput);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (hashHex === 'af45b9700bb0b00ef1b2f371e50c2eeae17e385748ed517cb25525ec2d6dab4a') {
            setIsUnlocked(true);
            setShowPasswordPrompt(false);
            setCustomUrl(selectedPreset.url); // Pre-fill with current selection if unlocked
        } else {
            alert('Incorrect password!');
            setPasswordInput('');
        }
    };

    // Faux XP Tabs
    const tabs = ['Themes', 'Desktop', 'Screen Saver', 'Appearance', 'Settings'];

    const renderMonitorPreview = () => (
        <div className="monitor-preview-container">
            <div className="monitor-preview-body">
                {/* Screen bezel */}
                <div className="monitor-preview-bezel">
                    {/* Screen content (wallpaper) */}
                    {(isUnlocked ? customUrl : selectedPreset.url) ? (
                        <div
                            className="monitor-preview-screen-content"
                            style={{ backgroundImage: `url(${isUnlocked ? customUrl : selectedPreset.url})` }}
                        />
                    ) : (
                        <div className="monitor-preview-screen-empty" />
                    )}
                </div>
            </div>
            {/* Monitor Stand */}
            <div className="monitor-stand-neck" />
            <div className="monitor-stand-base" />
        </div>
    );

    return (
        <WindowFrame
            title="Display Properties"
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 420, height: 500 }}
            minConstraints={[400, 480]}
            isResizable={false}
        >
            <div className="settings-window-container">

                {/* Tabs */}
                <div className="settings-tabs-container">
                    {tabs.map((tab) => (
                        <div key={tab} className={`settings-tab ${tab === 'Desktop' ? 'active' : ''}`}>
                            {tab}
                        </div>
                    ))}
                </div>

                {/* Tab Content Box */}
                <div className="settings-tab-content">

                    {/* Password Prompt Overlay */}
                    {showPasswordPrompt && (
                        <div className="password-prompt-overlay">
                            <div className="password-prompt-box">
                                <div className="password-prompt-header">Authentication Required</div>
                                <label className="password-prompt-label">Enter administrator password:</label>
                                <input
                                    className="xp-input"
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                                />
                                <div className="password-prompt-actions">
                                    <button className="xp-button" onClick={handlePasswordSubmit}>OK</button>
                                    <button className="xp-button" onClick={() => setShowPasswordPrompt(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {renderMonitorPreview()}

                    {isUnlocked ? (
                        <div className="settings-section">
                            <label className="password-prompt-label" style={{ fontWeight: 'bold' }}>Custom Administrator URL:</label>
                            <input
                                className="xp-input"
                                type="text"
                                value={customUrl}
                                onChange={(e) => setCustomUrl(e.target.value)}
                                placeholder="https://..."
                            />
                            <div className="settings-unlocked-text">
                                Unlocked: You can supply direct resource URLs to configure an unrestricted wallpaper override.
                            </div>
                        </div>
                    ) : (
                        <div className="settings-section" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label className="password-prompt-label">Background:</label>
                            <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                                <div className="settings-list-box">
                                    {presetWallpapers.map((preset) => (
                                        <div
                                            key={preset.name}
                                            className={`settings-list-item ${selectedPreset.name === preset.name ? 'selected' : ''}`}
                                            onClick={() => setSelectedPreset(preset)}
                                        >
                                            <span className="settings-list-icon"></span>
                                            {preset.name}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <button className="xp-button" style={{ padding: '3px' }} disabled>Browse...</button>
                                    <div style={{ marginTop: '15px' }}>
                                        <label className="password-prompt-label" style={{ marginBottom: '2px' }}>Position:</label>
                                        <select className="xp-input" style={{ padding: '2px' }} disabled>
                                            <option>Center</option>
                                        </select>
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <label className="password-prompt-label" style={{ marginBottom: '2px' }}>Color:</label>
                                        <div style={{ width: '100%', height: '22px', backgroundColor: '#3a6ea5', border: '1px solid #7f9db9' }} />
                                    </div>
                                </div>
                            </div>

                            <button
                                className="xp-button"
                                onClick={() => setShowPasswordPrompt(true)}
                                style={{ marginTop: '15px', padding: '3px 10px', alignSelf: 'flex-start' }}
                            >
                                Customize Desktop...
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Action Area */}
                <div className="settings-bottom-actions">
                    <button className="xp-button" onClick={handleOk}>OK</button>
                    <button className="xp-button" onClick={onClose}>Cancel</button>
                    <button className="xp-button" onClick={handleApply}>Apply</button>
                </div>
            </div>
        </WindowFrame>
    );
};

export default SettingsWindow;
