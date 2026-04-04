// src/components/windows/ChatboxWindow.js
import React, { useState } from 'react';
import WindowFrame from './WindowFrame';
import '../../styles/windows/about.css';

const ChatboxWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (!input.trim()) return;
        // Ensure state immutability by creating a new array when adding messages
        setMessages([...messages, { text: input, sender: 'User' }]);
        setInput('');
    };

    return (
        // REFACTOR: Abstracted Draggable and Resizable layout requirements into WindowFrame component
        <WindowFrame
            title="Chatbox"
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 400, height: 350 }}
            minConstraints={[300, 200]}
        >
            <div className="chatbox-messages" style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <div key={index} className={`chatbox-message ${message.sender}`} style={{ marginBottom: '8px' }}>
                        <strong>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div style={{ padding: '10px', display: 'flex', gap: '5px', borderTop: '1px solid #ccc' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    style={{ flex: 1, padding: '5px' }}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage} style={{ padding: '5px 15px' }}>Send</button>
            </div>
        </WindowFrame>
    );
};

export default ChatboxWindow;
