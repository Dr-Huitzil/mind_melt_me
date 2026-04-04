import React, { useState } from 'react'
import WindowFrame from './WindowFrame';
import '../../styles/windows/RecycleBinWindow.css';

// Mock Recycled Files

const recycledFiles = [
    { name: 'duck_pool.jpg', location: 'C:\\Pictures', size: '1.24 MB', type: 'image', source: require('../../assets/desktop-icons/kirby5.jpg') },
    { name: 'passwords.txt', location: 'C:\\Desktop', size: '2 KB', type: 'text', content: 'Admin Login: admin123\n\nWiFi: connect55\n\n.' },
    { name: 'old_resume.doc', location: 'C:\\Documents', size: '24 KB', type: 'unknown' },
    { name: 'kirby_dance.gif', location: 'C:\\Videos', size: '840 KB', type: 'image', source: require('../../assets/desktop-icons/kirby2.jpg') }
];

const RecycleBinWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized }) => {
    const [selectedFile, setSelectedFile] = useState(recycledFiles[0]);

    return (
        <WindowFrame
            title="Recycle Bin"
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 650, height: 420 }}
            minConstraints={[500, 350]}
        >
            <div className="rb-window-container">

                {/* Menu Bar */}
                <div className="rb-menu-bar">
                    <span className="rb-menu-item"><u>F</u>ile</span>
                    <span className="rb-menu-item"><u>E</u>dit</span>
                    <span className="rb-menu-item"><u>V</u>iew</span>
                    <span className="rb-menu-item"><u>H</u>elp</span>
                </div>

                {/* Main Split Body */}
                <div className="rb-split-body">

                    {/* Left Pane: File List */}
                    <div className="rb-pane-left">
                        <div className="rb-header-row">
                            <div className="rb-header rb-header-name">Name</div>
                            <div className="rb-header rb-header-flex">Original Loc...</div>
                        </div>
                        <div className="rb-content-area">
                            {recycledFiles.map(file => {
                                const isSelected = selectedFile && selectedFile.name === file.name;
                                return (
                                    <div
                                        key={file.name}
                                        className={`rb-list-item ${isSelected ? 'active' : ''}`}
                                        onClick={() => setSelectedFile(file)}
                                    >
                                        <div className="rb-col-name">
                                            {file.type === 'image' ? '🖼️' : file.type === 'text' ? '📝' : '📄'} {file.name}
                                        </div>
                                        <div className="rb-col-loc">{file.location}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Pane: Live Preview */}
                    <div className="rb-pane-right">
                        <div className="rb-header" style={{ paddingLeft: '8px' }}>Preview</div>
                        <div className="rb-preview-area">
                            {!selectedFile && <div className="rb-preview-empty">Select a file to preview.</div>}

                            {selectedFile && selectedFile.type === 'image' && (
                                <img src={selectedFile.source} alt="Preview" className="rb-preview-img" />
                            )}

                            {selectedFile && selectedFile.type === 'text' && (
                                <div className="rb-preview-text">
                                    {selectedFile.content}
                                </div>
                            )}

                            {selectedFile && selectedFile.type === 'unknown' && (
                                <div className="rb-preview-unknown">
                                    <div className="rb-preview-unknown-icon">❓</div>
                                    <div className="rb-preview-unknown-text">Preview not available for this file type.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="rb-status-bar">
                    <div className="rb-status-panel">
                        {recycledFiles.length} object(s)
                    </div>
                    <div className="rb-status-panel">
                        {selectedFile ? selectedFile.size : '0 bytes'}
                    </div>
                </div>
            </div>
        </WindowFrame>
    );
};

export default RecycleBinWindow;