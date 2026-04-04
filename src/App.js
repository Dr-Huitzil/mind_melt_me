import React, { useEffect, useState, Suspense, lazy } from 'react';
import Preloader from './components/Prelaoder';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import './styles/global.css';
import { useWindowState, useWindowActions } from './contexts/WindowContext';

import { windowComponentsMap } from './config/apps.config';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [loading, setLoading] = useState(true);

  const { runningApps } = useWindowState();
  const {
    handleOpenWindow,
    handleCloseWindow,
    handleMinimizeWindow,
    handleFocusWindow
  } = useWindowActions();

  // Custom Dynamic Wallpaper
  const [wallpaper, setWallpaper] = useState(localStorage.getItem('desktopWallpaper') || null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Persist wallpaper updates
  useEffect(() => {
    if (wallpaper) {
      // Only update if wallpaper is valid
      localStorage.setItem('desktopWallpaper', wallpaper);
    }
  }, [wallpaper]);

  // DYNAMIC APP RENDERING:
  const renderWindows = () => {
    return runningApps.map(app => {
      const Component = windowComponentsMap[app.name];

      if (!Component) return null;

      return (
        <ErrorBoundary key={app.id} app={app} handleCloseWindow={handleCloseWindow}>
          <Component
            minimized={app.minimized}
            zIndex={app.zIndex || 100}
            onFocus={() => handleFocusWindow(app.id)}
            onClose={() => handleCloseWindow(app.id)}
            onMinimize={() => handleMinimizeWindow(app.id)}
            initialPath={app.initialPath}
            targetFile={app.targetFile}
            fileTitle={app.fileTitle}
            onLaunchApp={handleOpenWindow}
            setWallpaper={setWallpaper}
          />
        </ErrorBoundary>
      );
    });
  };

  return (
    <div>
      {/* Boot screen sequence */}
      {loading && <Preloader />}

      {!loading && (
        <div>
          <Desktop wallpaper={wallpaper} />

          <Taskbar />

          {/* Render our component registry dynamically */}
          <Suspense fallback={null}>
            {renderWindows()}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default App;