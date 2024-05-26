import React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../styles/Window.css';

const Window = ({ id, title, children, onClose }) => {
    return (
        <Draggable handle=".window-titlebar">
            <div className='window' id={id}>
                <div className='window-titlebar'>
                    <span>{title}</span>
                    <button onClick={onClose}>X</button>
                </div>
                <ResizableBox width={300} height={200} minConstraints={[200, 100]} maxConstraints={[800, 600]}>
                    <div className='window-content'>
                        {children}
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default Window;