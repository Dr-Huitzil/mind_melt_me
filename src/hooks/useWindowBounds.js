import { useState, useEffect, useCallback } from "react";

let globalWindowOffset = 0;

export const useWindowBounds = (defaultSize) => {
    // clauclated synchorinously during initialsization to prevent top-left rendering flashes
    const [state, setState] = useState(() => {
        const { innerWidth, innerHeight } = window;
        globalWindowOffset = (globalWindowOffset + 30) % 210; // simple offset to prevent stacking
        return {
            position: {
                x: Math.max(0, (innerWidth - defaultSize.width) / 2) + globalWindowOffset - 105,
                y: Math.max(0, (innerHeight - defaultSize.height) / 2) + globalWindowOffset - 105,
            },
            size: defaultSize,
            isMaximized: false
        };
    });

    const [preMaximizeState, setPreMaximizeState] = useState(null);

    // keep window in bounds uf browser is resized
    useEffect(() => {
        const handleBrowserResize = () => {
            if (state.isMaximized) return; // skip if maximized, will be handled on restore
            setState(prev => {
                const { innerWidth, innerHeight } = window;
                let newX = Math.min(prev.position.x, Math.max(0, innerWidth - prev.size.width));
                let newY = Math.min(prev.position.y, Math.max(0, innerHeight - 70));
                newX = Math.max(0, newX);
                newY = Math.max(0, newY);
                if (newX === prev.position.x && newY === prev.position.y) return prev; // no change
                return {
                    ...prev,
                    position: { x: newX, y: newY }
                };
            });
        };

        window.addEventListener('resize', handleBrowserResize);
        return () => window.removeEventListener('resize', handleBrowserResize);
    }, [state.isMaximized]);

    //toggle the window between full screen and its regular size while remembering previous dimensions
    const handleResizeToggle = useCallback(() => {
        const { innerHeight, innerWidth } = window;

        if (!state.isMaximized) {
            // save state before maximizing so it can be restored later
            setPreMaximizeState({ size: state.size, position: state.position });
            setState(prev => ({
                ...prev,
                size: { width: innerWidth, height: innerHeight },
                position: { x: 0, y: 0 },
                isMaximized: true
            }));
        } else {
            // restore from saved state
            setState(prev => ({
                ...prev,
                size: preMaximizeState ? preMaximizeState.size : defaultSize,
                position: preMaximizeState ? preMaximizeState.position : prev.position,
                isMaximized: false
            }));
        }
    }, [state.isMaximized, preMaximizeState, defaultSize]);

    const handleDragStop = useCallback((e, data) => {
        setState(prev => ({
            ...prev,
            position: { x: data.x, y: data.y }
        }));
    }, []);

    const handleResizeStop = useCallback((e, data) => {
        setState(prev => ({
            ...prev,
            size: { width: data.size.width, height: data.size.height }
        }));

    }, []);

    return {
        state,
        handleResizeToggle,
        handleDragStop,
        handleResizeStop
    };
};