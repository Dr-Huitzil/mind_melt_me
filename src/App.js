import React, { useEffect, useState } from 'react';
import Preloader from './components/Prelaoder';
import Desktop from './components/Desktop';
import StartMenu from './components/StartMenu';
import Taskbar from './components/Taskbar';
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
        </div>
      )}
    </div>
  );
};

export default App;
