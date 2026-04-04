import React, { useState, useEffect } from 'react';
import WindowFrame from './WindowFrame';
import '../../styles/windows/MusicPlayerWindow.css';

// Mock Music Library
const librarySongs = [
    'MONTERO (CALL ME BY YOUR NAME)',
    'canyon.mid',
    'sound.wav',
    'windows_95_startup.wav',
    'kirby_theme.mp3'
];

// Color Theme Definitions
const themes = {
    'Rosemary': { base: '#c78d94', gradTop: '#f2d2d8', gradMid: '#dcb1b6', btnTop: '#f9e2e6', btnBot: '#d7a4ab', border: '#a3656d' },
    'Rain Forest': { base: '#8dc79a', gradTop: '#d2f2d9', gradMid: '#b1dcb8', btnTop: '#e2f9e6', btnBot: '#a4d7ab', border: '#65a371' },
    'Qwayke': { base: '#b08b73', gradTop: '#e8d5c8', gradMid: '#cba891', btnTop: '#f5e9e1', btnBot: '#bca18f', border: '#8b5a3e' },
    'Raspberry Club': { base: '#c27ba0', gradTop: '#f0cce0', gradMid: '#da9dbb', btnTop: '#f7e1ee', btnBot: '#d28fb1', border: '#9e4b78' },
    'Powerpuff': { base: '#99aab5', gradTop: '#d5e1e8', gradMid: '#b6c6d3', btnTop: '#e6eff5', btnBot: '#a7bac9', border: '#667d8f' }
};

const MusicPlayerWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized, targetFile, fileTitle }) => {
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTheme, setCurrentTheme] = useState('Rosemary');
    const [activeTab, setActiveTab] = useState('LIBRARY');
    const [currentSong, setCurrentSong] = useState(targetFile || librarySongs[0]);
    const [volume, setVolume] = useState(60);

    // Mock timer for the LCD display
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setTime(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // If fileTitle is provided, use it, else default to currentSong string (which might be an HTTP url now!)
    const currentName = fileTitle || (currentSong.startsWith('http') ? 'Remote Stream' : currentSong);
    const displayTitle = `${currentName.toUpperCase()} - WINAMP`;
    const theme = themes[currentTheme];

    // Build the dynamic CSS variable injection object for this specific theme iteration
    const themeVars = {
        '--theme-base': theme.base,
        '--theme-grad-top': theme.gradTop,
        '--theme-grad-mid': theme.gradMid,
        '--theme-btn-top': theme.btnTop,
        '--theme-btn-bot': theme.btnBot,
        '--theme-border': theme.border
    };

    const handlePrevious = () => {
        const currentIndex = librarySongs.indexOf(currentSong);
        const newIndex = currentIndex > 0 ? currentIndex - 1 : librarySongs.length - 1;
        setCurrentSong(librarySongs[newIndex]);
        setTime(0);
        setIsPlaying(true);
    };

    const handleNext = () => {
        const currentIndex = librarySongs.indexOf(currentSong);
        const newIndex = currentIndex < librarySongs.length - 1 ? currentIndex + 1 : 0;
        setCurrentSong(librarySongs[newIndex]);
        setTime(0);
        setIsPlaying(true);
    };

    const handleVolumeDrag = (e) => {
        if (e.buttons !== 1) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newVolume = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setVolume(newVolume);
    };

    return (
        <WindowFrame
            title="Winamp"
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 380, height: 460 }}
            minConstraints={[380, 460]}
        >
            {/* The root wrapper injecting the runtime CSS variables into CSS logic */}
            <div className="musicplayer-root" style={themeVars}>
                <div className="musicplayer-container">

                    {/* Menu Row */}
                    <div className="musicplayer-menu-row">
                        <span className="musicplayer-menu-item"><u>F</u>ile</span>
                        <span className="musicplayer-menu-item"><u>P</u>lay</span>
                        <span className="musicplayer-menu-item"><u>O</u>ptions</span>
                        <span className="musicplayer-menu-item"><u>V</u>iew</span>
                        <span className="musicplayer-menu-item"><u>H</u>elp</span>
                    </div>

                    {/* LCD Screen Array */}
                    <div className="musicplayer-lcd">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="musicplayer-lcd-time">
                                {formatTime(time)}
                            </div>

                            <div className="musicplayer-lcd-bitrate">
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <span className="musicplayer-lcd-badge">KBPS</span> 128
                                    <span className="musicplayer-lcd-badge" style={{ marginLeft: '4px' }}>KHz</span> 44
                                </div>
                                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                    <span className="musicplayer-lcd-badge-mono">STEREO</span>
                                </div>
                            </div>

                            {/* Spectrum Visualizer Mock */}
                            <div className="musicplayer-visualizer">
                                {[4, 8, 14, 20, 16, 10, 6, 12, 18, 22, 15, 9, 5].map((h, i) => (
                                    <div key={i} style={{ width: '4px', height: `${h + (isPlaying ? Math.random() * (volume / 10) : 0)}px`, backgroundColor: '#ffcccc' }} />
                                ))}
                            </div>
                        </div>

                        {/* Scrolling Text Layer */}
                        <div className="musicplayer-lcd-marquee-container">
                            <div className="lcd-marquee">{displayTitle} *** {displayTitle}</div>
                        </div>
                    </div>

                    {/* Timeline Slider */}
                    <div className="musicplayer-timeline-wrapper">
                        <div className="musicplayer-timeline-track">
                            <div className={`musicplayer-timeline-thumb ${isPlaying ? 'playing' : ''}`} style={{ left: `${(time % 100)}%` }} />
                        </div>
                    </div>

                    {/* Playback Controls & Volume */}
                    <div className="musicplayer-controls-row">
                        <div className="musicplayer-controls-group">
                            <div className="musicplayer-control-btn" onClick={handlePrevious}>⏮</div>
                            <div className="musicplayer-control-btn" onClick={() => setIsPlaying(true)}>▶</div>
                            <div className="musicplayer-control-btn" onClick={() => setIsPlaying(false)}>⏸</div>
                            <div className="musicplayer-control-btn" onClick={() => { setIsPlaying(false); setTime(0); }}>⏹</div>
                            <div className="musicplayer-control-btn" onClick={handleNext}>⏭</div>
                        </div>

                        {/* Volume area */}
                        <div className="musicplayer-volume-wrapper">
                            <span className="musicplayer-volume-icon">🔈</span>
                            <div
                                className="musicplayer-volume-track-container"
                                onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handleVolumeDrag(e); }}
                                onPointerMove={handleVolumeDrag}
                                onPointerUp={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) { e.currentTarget.releasePointerCapture(e.pointerId); } }}
                            >
                                <div className="musicplayer-volume-track" />
                                <div className="musicplayer-volume-thumb" style={{ left: `calc(${volume}% - 6px)` }} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Pane (Playlist / Themes Box) */}
                    <div className="musicplayer-bottom-pane">

                        {/* Dynamic Multi-Tab Content Box */}
                        <div className="musicplayer-list-box">
                            {activeTab === 'COLOR THEMES' && Object.keys(themes).map((themeName) => (
                                <div
                                    key={themeName}
                                    className={`musicplayer-list-item ${themeName === currentTheme ? 'selected' : ''}`}
                                    onClick={() => setCurrentTheme(themeName)}
                                >
                                    {themeName}
                                </div>
                            ))}

                            {activeTab === 'LIBRARY' && librarySongs.map((song) => (
                                <div
                                    key={song}
                                    className={`musicplayer-list-item ${song === currentSong ? 'selected' : ''}`}
                                    onClick={() => { setCurrentSong(song); setTime(0); setIsPlaying(true); }}
                                >
                                    {song}
                                </div>
                            ))}
                        </div>

                        {/* Configured Bottom Tabs */}
                        <div className="musicplayer-tabs-header">
                            <div
                                className={`musicplayer-tab ${activeTab === 'LIBRARY' ? 'active' : ''}`}
                                onClick={() => setActiveTab('LIBRARY')}
                            >
                                LIBRARY
                            </div>
                            <div
                                className={`musicplayer-tab ${activeTab === 'COLOR THEMES' ? 'active' : ''}`}
                                onClick={() => setActiveTab('COLOR THEMES')}
                            >
                                COLOR THEMES
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </WindowFrame>
    );
};

export default MusicPlayerWindow;
