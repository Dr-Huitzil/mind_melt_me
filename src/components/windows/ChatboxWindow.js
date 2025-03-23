// src/components/windows/ChatboxWindow.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/windows/about.css';

const ChatboxWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [windowPosition] = useState({ x: 0, y: 0 });
    const [windowSize] = useState({ width: 400, height: 300 });

    const handleSendMessage = () => {
        setMessages([...messages, { text: input, sender: 'User' }]);
        setInput('');
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
                            <span className="window-title">Chatbox</span>
                            <div>
                                <button className="window-close-button" onClick={onClose}>X</button>
                            </div>
                        </div>
                        <div className="window-content">
                            <div className="chatbox-messages">
                                {messages.map((message, index) => (
                                    <div key={index} className={`chatbox-message ${message.sender}`}>
                                        {message.text}
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default ChatboxWindow;
