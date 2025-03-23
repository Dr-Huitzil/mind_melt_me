// src/components/windows/CalculatorWindow.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/windows/about.css';

const CalculatorWindow = ({ onClose }) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [windowPosition] = useState({ x: 0, y: 0 });
    const [windowSize] = useState({ width: 400, height: 300 });

    const handleButtonClick = (value) => {
        if (value === '=') {
            try {
                setResult((input));
            } catch {
                setResult('Error');
            }
        } else if (value === 'C') {
            setInput('');
            setResult('');
        } else {
            setInput(input + value);
        }
    };

    return (
        <Draggable handle=".window-title-bar">
            <div style={{ position: 'absolute', left: windowPosition.x, top: windowPosition.y }}>
                <ResizableBox
                    width={windowSize.width}
                    height={windowSize.height}
                    minConstraints={[300, 200]}
                    maxConstraints={[600, 400]}
                    className="resizable-box"
                >
                    <div className="window">
                        <div className="window-title-bar">
                            <span className="window-title">Calculator</span>
                            <div>
                                <button className="window-close-button" onClick={onClose}>X</button>
                            </div>
                        </div>
                        <div className="window-content">
                            <div className="calculator-display">
                                <input type="text" value={input} readOnly />
                                <div className="calculator-result">{result}</div>
                            </div>
                            <div className="calculator-buttons">
                                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((btn) => (
                                    <button key={btn} onClick={() => handleButtonClick(btn)}>{btn}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default CalculatorWindow;
