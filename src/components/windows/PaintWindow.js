import React, { useState } from 'react';
import WindowFrame from './WindowFrame';
import { ResizableBox } from 'react-resizable';
import '../../styles/windows/PaintWindow.css';

const PaintWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized, targetFile, fileTitle }) => {
    // Determine the title based on the targetFile optionally passed in
    const titleText = fileTitle ? `${fileTitle} - Paint` : (targetFile && !targetFile.startsWith('http')) ? `${targetFile} - Paint` : 'untitled - Paint';

    // 16 Classic MS Paint Tools (Mocked with Emojis / Unicode)
    const tools = [
        '⬡', '⬚', // Free-Form Select, Select
        '🧼', '🪣', // Eraser, Fill
        '💧', '🔍', // Pick Color, Magnifier
        '✏️', '🖌️', // Pencil, Brush
        '💨', 'A',  // Airbrush, Text
        '∖', '〰',   // Line, Curve
        '▭', '▱',   // Rectangle, Polygon
        '◯', '⬜'   // Ellipse, Rounded Rectangle
    ];

    // Classic Windows 16-color palette
    const colors1 = ['#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000'];
    const colors2 = ['#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff0080', '#ff8040'];

    const [activeTool, setActiveTool] = useState(6); // Pencil default
    const [primaryColor, setPrimaryColor] = useState('#000000');
    const [secondaryColor, setSecondaryColor] = useState('#ffffff');
    const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 });

    return (
        <WindowFrame
            title={titleText}
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 600, height: 480 }}
            minConstraints={[400, 300]}
        >
            <div className="paint-window-container">

                {/* Menu Bar */}
                <div className="paint-menu-bar">
                    <span className="paint-menu-item"><u>F</u>ile</span>
                    <span className="paint-menu-item"><u>E</u>dit</span>
                    <span className="paint-menu-item"><u>V</u>iew</span>
                    <span className="paint-menu-item"><u>I</u>mage</span>
                    <span className="paint-menu-item"><u>O</u>ptions</span>
                    <span className="paint-menu-item"><u>H</u>elp</span>
                </div>

                {/* Main Body */}
                <div className="paint-body">

                    {/* Left Toolbar */}
                    <div className="paint-toolbar-left">
                        <div className="paint-tools-grid">
                            {tools.map((icon, index) => {
                                const isActive = activeTool === index;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setActiveTool(index)}
                                        className={`paint-tool-btn ${isActive ? 'paint-border-inset' : 'paint-border-outset'}`}
                                        title={`Tool ${index}`}
                                    >
                                        {icon}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Tool Options Box (bottom of tools) */}
                        <div className="paint-tool-options-box paint-border-inset" />
                    </div>

                    {/* Canvas Area */}
                    <div className="paint-canvas-wrapper paint-border-inset">
                        <ResizableBox
                            width={canvasSize.width}
                            height={canvasSize.height}
                            onResize={(e, data) => setCanvasSize({ width: data.size.width, height: data.size.height })}
                            minConstraints={[50, 50]}
                            handle={
                                <div className="paint-resize-handle-br" />
                            }
                        >
                            {/* The actual canvas */}
                            <div className="paint-canvas-sheet">
                                {/* Render mapped mock images physically on the canvas */}
                                {targetFile && targetFile.startsWith('http') ? (
                                    <img src={targetFile} alt="remote" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : targetFile === 'kirby.bmp' ? (
                                    <img src={require('../../assets/desktop-icons/kirby1.jpg')} alt="kirby" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                                ) : targetFile === 'vacation.bmp' ? (
                                    <img src={require('../../assets/desktop-icons/kirby5.jpg')} alt="vacation" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                                ) : targetFile && typeof targetFile === 'string' && targetFile.match(/\.(jpeg|jpg|gif|png|bmp|webp)$/i) ? (
                                    <img src={targetFile} alt={targetFile} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : targetFile ? (
                                    <div style={{ color: '#aaa', fontSize: '24px', fontFamily: 'serif', margin: '20px' }}>
                                        [ Image Data: {targetFile} ]
                                    </div>
                                ) : null}

                                {/* Resize handles (visual/decorative defaults) */}
                                <div className="paint-resize-handle-r" />
                                <div className="paint-resize-handle-b" />
                            </div>
                        </ResizableBox>
                    </div>

                </div>

                {/* Bottom Palette Area */}
                <div className="paint-palette-area">
                    {/* Current Colors */}
                    <div className="paint-active-colors paint-border-inset">
                        <div className="paint-color-secondary paint-border-inset" style={{ backgroundColor: secondaryColor }} />
                        <div className="paint-color-primary paint-border-inset" style={{ backgroundColor: primaryColor }} />
                    </div>
                    {/* Color Swatches */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                        <div style={{ display: 'flex' }}>
                            {colors1.map(c => <div key={c} onClick={() => setPrimaryColor(c)} onContextMenu={(e) => { e.preventDefault(); setSecondaryColor(c); }} className="paint-color-swatch paint-border-inset" style={{ backgroundColor: c }} />)}
                        </div>
                        <div style={{ display: 'flex' }}>
                            {colors2.map(c => <div key={c} onClick={() => setPrimaryColor(c)} onContextMenu={(e) => { e.preventDefault(); setSecondaryColor(c); }} className="paint-color-swatch paint-border-inset" style={{ backgroundColor: c }} />)}
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="paint-status-bar paint-border-inset">
                    <span>For Help, click Help Topics on the Help Menu.</span>
                    <span className="paint-border-inset" style={{ width: '100px', padding: '0 4px' }}></span>
                </div>
            </div>
        </WindowFrame>
    );
};

export default PaintWindow;
