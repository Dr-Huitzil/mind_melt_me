import React from 'react'
import WindowFrame from './WindowFrame';
import '../../styles/windows/PowerOptionsWindow.css'

const PowerOptionsWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized }) => {

    const handleRestart = () => {
        window.location.reload();
    };

    const handleShutdown = () => {
        //attemot to close the browser tab to simulate shutdown
        window.close();

        // fallback for browsers that clock  window.close() unless opened by script
        document.body.innerHTML = '<div style="background-color:black;color:#ff8500;display:flex;justify-content:center;align-items:center;height:100vh;font-family:\'Courier New\', monospace;font-size:32px;">It is now safe to turn off your computer.</div>';
    };

    return (
        <WindowFrame
            title="Shut Down Windows"
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 340, height: 180 }}
            minConstraints={[340, 180]}
            isResizable={false}
        >
            <div className="power-options-container">
                <div className="power-options-header">
                    <span className="power-options-header-icon">💻</span>
                    <span className="power-options-header-title">What do you want the computer to do?</span>
                </div>

                <div className="power-options-actions">
                    <div
                        className="power-action-wrapper"
                        onClick={handleRestart}
                    >
                        <button className="power-action-btn">
                            <span className="power-action-btn-icon-green">🔄</span> Restart
                        </button>
                    </div>

                    <div
                        className="power-action-wrapper"
                        onClick={handleShutdown}
                    >
                        <button className="power-action-btn">
                            <span className="power-action-btn-icon-red">⏻</span> Shut down
                        </button>
                    </div>
                </div>
            </div>
        </WindowFrame>
    );
};

export default PowerOptionsWindow;