import React, { useEffect, useState } from 'react';
import Preloader from './components/Prelaoder'
import Desktop from './components/Desktop';
import StartMenu from './components/StartMenu';
import Taskbar from './components/Taskbar';
import AboutWindow from './components/windows/AboutWindow';
// Import other windows as needed

import './styles/global.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(false);
  const [runningApps, setRunningApps] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleStartMenu = () => {
    setStartMenuVisible(!startMenuVisible);
  };

  const closeStartMenu = () => {
    setStartMenuVisible(false);
  };

  const handleIconClick = (appName) => {
    if (!runningApps.some(app => app.name === appName)) {
      setRunningApps([...runningApps, { id: runningApps.length + 1, name: appName }]);
    }
  };

  const closeApp = (appId) => {
    setRunningApps(runningApps.filter(app => app.id !== appId));
  };

  const renderWindow = (app) => {
    switch (app.name) {
      case 'about':
        return <AboutWindow key={app.id} onClose={() => closeApp(app.id)} />;
      // Add cases for other windows
      default:
        return null;
    }
  };

  return (
    <div>
      {loading && <Preloader />}
      {!loading && (
        <div>
          <Desktop onIconClick={handleIconClick} />
          <div className={`start-menu-wrapper ${startMenuVisible ? 'visible' : ''}`}>
            <StartMenu onClose={closeStartMenu} />
          </div>
          <Taskbar runningApps={runningApps} />
          <button className='start-button' onClick={toggleStartMenu}>
            Start
          </button>
          {runningApps.map(app => renderWindow(app))}
        </div>
      )}
    </div>
  );
};

export default App;
