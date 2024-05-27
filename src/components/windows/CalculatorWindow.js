import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/Window.css';

const CalculatorWindow = ({ onClose }) => {
    const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);

    useEffect(() => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const boxHeight = 300;
        const boxWidth = 400;
        const x = (windowWidth - boxWidth) / 2;
        const y = (windowHeight - boxHeight) / 2;

        setWindowPosition({ x, y });
    }, []);

    return (
        <Draggable handle=".window-title-bar">
            <div style={{ position: 'absolute', left: windowPosition.x, top: windowPosition.y }}>
                <ResizableBox
                    width={400}
                    height={300}
                    minConstraints={[300, 200]}
                    maxConstraints={[600, 400]}
                    className="resizable-box"
                >
                    <div className="window" ref={windowRef}>
                        <div className="window-title-bar">
                            <span className="window-title">Calculator</span>
                            <button className="window-close-button" onClick={onClose}>X</button>
                        </div>
                        <div className="window-content">
                            <h2>Calculator</h2>
                            <p>This is the Calculator window content.</p>
                        </div>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default CalculatorWindow;
