import React from 'react';
import WindowFrame from './WindowFrame';

const VideoPlayerWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized, targetFile, fileTitle }) => {
    const videoSrc = targetFile || 'https://www.w3schools.com/html/mov_bbb.mp4';
    const titleText = fileTitle ? `${fileTitle} - MM Media Player` : 'MM Media Player';

    const menuStyle = { padding: '2px 8px', cursor: 'default', fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: '11px' };

    return (
        <WindowFrame
            title={titleText}
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 500, height: 400 }}
            minConstraints={[300, 200]}
        >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#c0c0c0' }}>

                {/* Menu Bar */}
                <div style={{ display: 'flex', padding: '2px 0' }}>
                    <span style={menuStyle}><u>F</u>ile</span>
                    <span style={menuStyle}><u>V</u>iew</span>
                    <span style={menuStyle}><u>P</u>lay</span>
                    <span style={menuStyle}><u>H</u>elp</span>
                </div>

                {/* Classic Inset Video Container */}
                <div style={{
                    flex: 1,
                    backgroundColor: '#000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTop: '2px solid #808080', borderLeft: '2px solid #808080',
                    borderRight: '2px solid #fff', borderBottom: '2px solid #fff'
                }}>
                    <video
                        src={videoSrc}
                        controls
                        autoPlay
                        style={{ maxWidth: '100%', maxHeight: '100%', outline: 'none' }}
                    />
                </div>
            </div>
        </WindowFrame>
    );
};

export default VideoPlayerWindow;
