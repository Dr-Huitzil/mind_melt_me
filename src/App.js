import React, { useEffect, useState } from 'react';
import Preloader from './components/Prelaoder';
import Desktop from './components/Desktop';
import StartMenu from './components/StartMenu';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import './styles/global.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(false);
  const [runningApps, setRunningApps] = useState([]);
  const [openWindows, setOpenWindows] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleStartMenu = () => {
    console.log('toggle start menu');
    setStartMenuVisible(!startMenuVisible);
  };

  const closeStartMenu = () => {
    console.log('close start menu');
    setStartMenuVisible(false);
  };

  const handleIconClick = (appName) => {
    if (!runningApps.some(app => app.name === appName)) {
      setRunningApps([...runningApps, { id: runningApps.length + 1, name: appName, action: () => alert(`${appName} is running`) }]);
    }
  };

  const handleCloseWindow = (id) => {
    setOpenWindows(openWindows.filter(window => window.id !== id));
  }

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
          <button className="start-button" onClick={toggleStartMenu}>
            Start
          </button>
          {openWindows.map(window => (
            <Window
              key={window.id}
              id={window.id}
              title={window.name}
              onClose={() => handleCloseWindow(window.id)}
            >
              <div> This is the {window.title} window</div>
            </Window>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
