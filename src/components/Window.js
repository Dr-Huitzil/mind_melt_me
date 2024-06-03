import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import '../styles/Window.css';

const Window = ({ id, title, address, children, open }) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMaximize = (e) => {
        e.preventDefault();
        setIsMaximized(true);
    };

    const handleRestore = (e) => {
        e.preventDefault();
        setIsMinimized(false);
        setIsMaximized(false);
    };

    const handleMinimize = (e) => {
        e.preventDefault();
        setIsMinimized(true);
    }



    return (
        <Draggable handle=".ui-dialog-titlebar">
            <ResizableBox
                width={isMaximized ? window.innerWidth : 600}
                height={isMaximized ? window.innerHeight : 400}
                minConstraints={[400, 200]}
                maxConstraints={isMaximized ? [window.innerWidth, window.innerHeight] : [800, 800]}
                className={`popup ${open ? "open" : "nopen"} ${isMinimized ? "minimized" : ""}`}
                id={id}
                handle={
                    <div>
                        <div className="ui-resizable-handle ui-resizable-n"></div>
                        <div className="ui-resizable-handle ui-resizable-e"></div>
                        <div className="ui-resizable-handle ui-resizable-s"></div>
                        <div className="ui-resizable-handle ui-resizable-w"></div>
                        <div className="ui-resizable-handle ui-resizable-ne ui-icon ui-icon-gripsmall-diagonal-se"></div>
                        <div className="ui-resizable-handle ui-resizable-nw ui-icon ui-icon-gripsmall-diagonal-se"></div>
                        <div className="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se"></div>
                        <div className="ui-resizable-handle ui-resizable-sw ui-icon ui-icon-gripsmall-diagonal-se"></div>
                    </div>
                }
            >
                <div className="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle" style={{ backgroundColor: 'var(--red)', whiteSpace: 'normal' }}>
                    <span id="ui-id-1" className="ui-dialog-title">{title}</span>
                    <div className="ui-dialog-titlebar-buttonpane" style={{ position: 'absolute', top: '50%', right: '0.3em', marginTop: '-10px', height: '18px' }}>
                        <button type="button" className="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close" title="Close" style={{ position: 'relative', float: 'right', top: 'auto', right: 'auto', margin: '0px' }} onClick={() => console.log('Close Popup')}>
                            <span className="ui-button-icon ui-icon ui-icon-closethick"></span>
                            <span className="ui-button-icon-space"> </span>Close
                        </button>
                        <a className="ui-dialog-titlebar-maximize ui-corner-all ui-state-default" href="#" title="maximize" role="button" style={{ display: isMaximized ? 'none' : 'flex' }} onClick={handleMaximize}>
                            <span className="ui-icon ui-icon-extlink">maximize</span>
                        </a>
                        <a className="ui-dialog-titlebar-restore ui-corner-all ui-state-default" href="#" role="button" style={{ display: isMaximized ? 'flex' : 'none', right: '1.4em' }} onClick={handleRestore}>
                            <span className="ui-icon ui-icon-newwin" title="restore">restore</span>
                        </a>
                        <a className="ui-dialog-titlebar-minimize ui-corner-all ui-state-default" href="#" title="minimize" role="button" onClick={handleMinimize}>
                            <span className="ui-icon ui-icon-minus">minimize</span>
                        </a>
                    </div>
                </div>

                <div className="sub-titlebar">
                    <span id="sub-bar"><u>F</u>ile</span>
                    <span id="sub-bar"><u>E</u>dit</span>
                    <span id="sub-bar"><u>V</u>iew</span>
                    <span id="sub-bar"><u>H</u>elp</span>
                </div>

                <div className="dialognav titlebar-extra">
                    Address:<div className="dialogaddress">{address}</div>
                </div>

                <div className="ui-dialog-content ui0widget-content">
                    {children}
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default Window;