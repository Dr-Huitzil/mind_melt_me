import React, { useState } from 'react';
import WindowFrame from './WindowFrame';
import '../../styles/windows/NotepadWindow.css';

const mockTextData = {
    'about.txt': 'This is the Mind Melt OS Notepad!\n\nThis is a classic Windows 95 style interface built with React.\n\nGo crazy, go stupid. You can actually type on there btw',
};

const NotepadWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized, targetFile }) => {
    const titleText = targetFile ? `${targetFile} - Notepad` : 'Untitled - Notepad';

    // If a mock file matches, use its data. Otherwise just be empty.
    const [content, setContent] = useState(mockTextData[targetFile] || '');

    return (
        <WindowFrame
            title={titleText}
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 450, height: 400 }}
            minConstraints={[300, 200]}
        >
            <div className="not-window-container">

                {/* Menu Bar */}
                <div className="not-menu-bar">
                    <span className="not-menu-item"><u>F</u>ile</span>
                    <span className="not-menu-item"><u>E</u>dit</span>
                    <span className="not-menu-item"><u>S</u>earch</span>
                    <span className="not-menu-item"><u>H</u>elp</span>
                </div>

                {/* Main Body - Text Area */}
                <div className="not-text-area-wrapper">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellCheck="false"
                        className="not-text-area"
                    />
                </div>
            </div>
        </WindowFrame>
    );
};

export default NotepadWindow;