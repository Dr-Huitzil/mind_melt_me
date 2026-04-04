import React, { useState } from "react";
import Draggable from 'react-draggable';
import ContextMenu from './ContextMenu'
import { useWindowActions } from '../contexts/WindowContext';
import '../styles/Desktop.css';

import { desktopIcons, appsConfig } from '../config/apps.config';

const DesktopIcon = ({ id, name, icon, onClick, initialPosition, onDragStop }) => {
    const nodeRef = React.useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            defaultPosition={initialPosition}
            onStop={(e, data) => onDragStop(id, e, data)}
        >
            <div
                ref={nodeRef}
                className='desktop-icon'
                onDoubleClick={() => onClick(id)}
                role="button"
                tabIndex={0}
            >
                <img src={icon} alt={name} loading="lazy" />
                <span>{name}</span>
            </div>
        </Draggable>
    );
};


const Desktop = ({ wallpaper }) => {
    const { handleOpenWindow } = useWindowActions();

    const [contextMenu, setContextMenu] = useState({
        visible: false,
        position: { x: 0, y: 0 }
    });
    const [iconPositions, setIconPositions] = useState(() => {
        try {
            const saved = localStorage.getItem('desktopIconPositions');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
                    return parsed;
                }
                console.warn("Security/Format Warnings: Desktop 'desktopIconPositions' storage mapping is malicious or corrupt. Automatically resetting to default");
            }
            return {};
        } catch (e) {
            console.warn("Security/Format Warning: Desktop 'desktopIconPositions' parsing fualt", e.message);
        }
    });

    const handleIconClick = (appId) => {
        // find the app configuration by ID
        const appInfo = Object.values(appsConfig).find(app => app.id === appId);
        if (appInfo && appInfo.windowName) {
            handleOpenWindow(appInfo.windowName, appInfo.props || {});
        }
    };

    const handleDragStop = (id, e, data) => {
        setIconPositions(prev => {
            const newPos = { ...prev, [id]: { x: data.x, y: data.y } };
            localStorage.setItem('desktopIconPositions', JSON.stringify(newPos));
            return newPos;
        });
    };

    const handleRightClick = (event) => {
        event.preventDefault();
        setContextMenu({
            visible: true,
            position: { x: event.clientX, y: event.clientY }
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    };

    const handleDisplaySettings = () => {
        handleCloseContextMenu();
        handleIconClick('settings');
    };

    return (
        <div
            className="desktop"
            style={wallpaper ? { backgroundImage: `url(${wallpaper})` } : {}}
            onContextMenu={handleRightClick}
            onClick={handleCloseContextMenu}
        >
            {desktopIcons.map((app) => (
                <DesktopIcon
                    key={app.id}
                    id={app.id}
                    name={app.displayName}
                    icon={app.desktopIcon}
                    onClick={handleIconClick}
                    initialPosition={iconPositions[app.id] || { x: 0, y: 0 }}
                    onDragStop={handleDragStop}
                />
            ))}

            {/* Capitalized component tag so React registers it as ContextMenu componnet and not as HTML5 <contextMenu>*/}
            <ContextMenu
                position={contextMenu.position}
                visible={contextMenu.visible}
                onClose={handleCloseContextMenu}
                onDisplaySettings={handleDisplaySettings}
            />
        </div>
    );
};

export default React.memo(Desktop);