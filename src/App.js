import React, { useEffect, useState } from 'react';
import Preloader from './components/Prelaoder';
import Desktop from './components/Desktop';
import StartMenu from './components/StartMenu';

import './styles/global.css';
import Taskbar from './components/Taskbar';

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
    setStartMenuVisible(!startMenuVisible)
  };

  const closeStartMenu = () => {
    setStartMenuVisible(false);
  }

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
          <Desktop />
          {startMenuVisible && <StartMenu onClose={closeStartMenu} />}
          <Taskbar runningApps={runningApps} />
          <button className='start-button' onClick={toggleStartMenu}>
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
