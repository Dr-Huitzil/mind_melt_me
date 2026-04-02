import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { useWindowBounds } from '../../hooks/useWindowBounds';
import 'react-resizable/css/styles.css';
// using the CSS from about.css for a consistent look across windows
import '../../styles/windows/about.css';

/**
 * A universal adn reusable window frame component for Mind Melt OS applications
 * this encapsulate all the boilerplate associated with the window drag, resize, and maximization
 * 
 * @param {string} title - Text displayed in the window's title bar
 * @param {object} defaultSize - Initial pixel dimensions of the window, e.g. { width: 400, height: 300 }
 * @param {array} minConstraints - minimum pixelBounds [minWidth, minHeight]
 * @param {ReactNode} children - The actual app content to render inside of the frame
 * @param {function} onClose - Triggered when the user clicks on the "x" button
 * @param {array} menuBarItems - Optional file/edit menus to display below the title
 */

const WindowFrame = ({
    title,
    defaultSize = { width: 800, height: 600 },
    minConstraints = [300, 200],
    isResizable = true,
    children,
    onClose,
    onMinimize,
    menuBarItems,
    zIndex = 100, // dynamic stacking order for multiple windows
    onFocus, // callback to when the window boundary is clicked/dragged
    minimized //CSS toggle to preserve DOM state
}) => {

    //Custom hook manages window bounds, dragging, and resizing events
    const {
        state,
        handleResizeToggle,
        handleDragStop,
        handleResizeStop
    } = useWindowBounds(defaultSize);

    const windowRef = useRef(null);
    const draggableNodeRef = useRef(null);

    return (
        <div style={{ display: minimized ? 'none' : 'block' }}>
            {/* the Draggable wrapper permits dragging the component by its title bar */}
            <Draggable
                nodeRef={draggableNodeRef}
                handle=".window-header"
                bounds={{
                    top: 0, //prevents the title bar from being dragged off the top of the viewport
                    left: -state.size.width + 100, // Ensure at least 100px remains grabbable on left
                    right: window.innerWidth - 100, // Ensure at least 100px remain grabbable on right
                    bottom: window.innerHeight - 70 // Keep top of window visible if dragged to the bottom
                }}
                disabled={state.isMaximized} // Disable dragging when maximized to prevent weird bugs
                position={state.position}
                onStop={handleDragStop}
            >
                <div
                    ref={draggableNodeRef}
                    onMouseDownCapture={onFocus} // Fires during capture phase before dragging starts
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: zIndex //controlled by App.js
                    }}>
                    {/* ResizableBox allows dynamic scaling by grabbing the bottom right corner */}
                    <ResizableBox
                        width={state.size.width}
                        height={state.size.height}
                        minConstraints={minConstraints}
                        maxConstraints={isResizable ? [window.innerWidth, window.innerHeight] : [state.size.width, state.size.height]} // Prevent resizing beyond viewport
                        handle={isResizable ? <div className='react-resizable-handle'></div> : <span />} // Show handle only if resizable
                        onResizeStop={handleResizeStop}
                    >
                        <div className="window" ref={windowRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

                            {/*Title Bar Area*/}
                            <div className='window-header'>
                                <h3 className='no-margin'>{title}</h3>
                                <div className='window-controls'>
                                    <button className='window-control' onClick={onMinimize}>_</button>
                                    <button className='window-control' onClick={handleResizeToggle}>
                                        {state.isMaximized ? '🗗' : '🗖'}
                                    </button>
                                    <button className='window-control-close' onClick={onClose}>X</button>
                                </div>
                            </div>

                            {/* Optional Menu Bar */}
                            {menuBarItems && (
                                <div className='menu-bar'>
                                    {menuBarItems.map((item, index) => (
                                        <span key={index} className='menu-button'>
                                            {item.label}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Window body (where the actual app lives) */}
                            <div className='window-body' style={{ flex: 1, overflow: 'auto' }}>
                                {children}
                            </div>
                        </div>
                    </ResizableBox>
                </div>
            </Draggable>
        </div>
    );
};

export default React.memo(WindowFrame);