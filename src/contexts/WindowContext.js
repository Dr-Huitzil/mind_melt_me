import react, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export const WindowStateContext = createContext();
export const WindowActionContext = createContext();

export const useWindowState = () => {
    return useContext(WindowStateContext);
};

export const useWindowActions = () => {
    return useContext(WindowActionContext);
};

export const WindowProvider = ({ children }) => {
    // all open application are managed in this array
    const [runningApps, setRunningApps] = useState([]);

    //restore previously running apps from localStorate on boot
    useEffect(() => {
        let savedRunningApps = [];
        try {
            const parsed = JSON.parse(localStorage.getItem("runningApps"));
            if (Array.isArray(parsed)) {
                savedRunningApps = parsed;
            } else if (parsed) {
                console.warn("Security/Format Warning: WindowContext 'runningApps' storage data is not an array Automatically resetting to safe default.");
            }
        } catch (e) {
            console.warn("Security/Format Warning: WindowContext 'runningApps' parsing fault.", e.message);
        }

        setRunningApps(savedRunningApps.map(app => ({
            ...app,
            minimized: typeof app.minimized === 'boolean' ? app.minimized : false,
            zIndex: typeof app.zIndex === 'number' ? app.zIndex : 100 // default zIndex fallback
        })));
    }, []);

    //save changes to running apps back into localStorage automatically
    useEffect(() => {
        localStorage.setItem('runningApps', JSON.stringify(runningApps));
    }, [runningApps]);

    //Brings window to the highest active z-index mathematically, and normalizes the stack
    const handleFocusWindow = useCallback((appId) => {
        setRunningApps(apps => {
            const targetApp = apps.find(a => a.id === appId);
            if (!targetApp) return apps;

            const otherApps = apps.filter(a => a.id !== appId).sort((a, b) => (a.zIndex || 100) - (b.zIndex || 100));
            const normalizedApps = otherApps.map((app, index) => ({ ...app, zIndex: 100 + index }));
            normalizedApps.push({ ...targetApp, zIndex: 100 + otherApps.length });

            return normalizedApps;
        });
    }, []);

    //unified generic loader for any app
    //pass an appName, adn it adds it to the list
    const handleOpenWindow = useCallback((appName, props = {}) => {
        setRunningApps(currentApps => {
            const newZIndex = Math.max(100, ...currentApps.map(a => a.zIndex || 100)) + 1;
            const instanceId = appName.toLowerCase() + (props.initialPath ? '_' + props.initialPath.replace(/[^a-zA-Z0-9]/g, '') : '');

            // Check if an instance of the app with the same initialPath already exists
            if (!currentApps.some(app => app.id === instanceId)) {
                return [
                    ...currentApps,
                    {
                        id: instanceId,
                        name: appName,
                        minimized: false,
                        zIndex: newZIndex,
                        ...props // dynamically injected parameters (like initialPath)
                    }
                ];
            } else {
                // i fit exists but is minimized, bring it back up and to the front
                return currentApps.map(app =>
                    app.id === instanceId ? { ...app, minimized: false, zIndex: newZIndex } : app
                );
            }
        });
    }, []);

    // generic close handler
    const handleCloseWindow = useCallback((appId) => {
        setRunningApps(currentApps => currentApps.filter(app => app.id !== appId));
    }, []);

    //Generic minimize handler
    const handleMinimizeWindow = useCallback((appId) => {
        setRunningApps(currentApps => currentApps.map(app =>
            app.id === appId ? { ...app, minimized: true } : app
        ));
    }, []);

    const stateValue = useMemo(() => ({
        runningApps
    }), [runningApps]);

    const actionValue = useMemo(() => ({
        handleOpenWindow,
        handleCloseWindow,
        handleMinimizeWindow,
        handleFocusWindow

    }), [handleOpenWindow, handleCloseWindow, handleMinimizeWindow, handleFocusWindow]);

    return (
        <WindowStateContext.Provider value={stateValue}>
            <WindowActionContext.Provider value={actionValue}>
                {children}
            </WindowActionContext.Provider>
        </WindowStateContext.Provider>
    );
};