import React, { useEffect, useState } from 'react';
import Preloader from './components/Prelaoder';
import Desktop from './components/Desktop';
import TaskbarwStart from './components/TaskbarwStart';// Updated import
import './styles/global.css';
import About from './components/windows/about';
import ChatboxWindow from './components/windows/ChatboxWindow';
import CalculatorWindow from './components/windows/CalculatorWindow';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [runningApps, setRunningApps] = useState([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isChatboxWindowOpen, setChatboxWindowOpen] = useState(false);
  const [isCalculatorWindowOpen, setCalculatorWindowOpen] = useState(false);
  const [isShopWindowOpen, setShopWindowOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Load state from localStorage
    const savedRunningApps = JSON.parse(localStorage.getItem('runningApps')) || [];
    setRunningApps(savedRunningApps.map(app => ({
      ...app,
      // Ensure minimized state is boolean
      minimized: typeof app.minimized === 'boolean' ? app.minimized : false
    })));

    setIsAboutOpen(localStorage.getItem('isAboutOpen') === 'true');
    setChatboxWindowOpen(localStorage.getItem('isChatboxWindowOpen') === 'true');
    setCalculatorWindowOpen(localStorage.getItem('isCalculatorWindowOpen') === 'true');
    setShopWindowOpen(localStorage.getItem('isShopWindowOpen') === 'true');

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('runningApps', JSON.stringify(runningApps));
    localStorage.setItem('isAboutOpen', isAboutOpen);
    localStorage.setItem('isChatboxWindowOpen', isChatboxWindowOpen);
    localStorage.setItem('isCalculatorWindowOpen', isCalculatorWindowOpen);
    localStorage.setItem('isShopWindowOpen', isShopWindowOpen);
  }, [runningApps, isAboutOpen, isChatboxWindowOpen, isCalculatorWindowOpen, isShopWindowOpen]);

  // Unified window handling functions
  const handleWindowToggle = (appName, isOpen) => {
    if (isOpen) {
      addRunningApp(appName);
    } else {
      removeRunningApp(appName);
    }
  };

  const handleOpenWindow = (appName) => {
    switch (appName) {
      case 'About':
        setIsAboutOpen(true);
        break;
      case 'Chatbox':
        setChatboxWindowOpen(true);
        break;
      case 'Calculator':
        setCalculatorWindowOpen(true);
        break;
      case 'Shop':
        setShopWindowOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCloseWindow = (appName) => {
    switch (appName) {
      case 'About':
        setIsAboutOpen(false);
        break;
      case 'Chatbox':
        setChatboxWindowOpen(false);
        break;
      case 'Calculator':
        setCalculatorWindowOpen(false);
        break;
      case 'Shop':
        setShopWindowOpen(false);
        break;
      default:
        break;
    }
  };

  const handleIconClick = (appName) => {
    const appMap = {
      about: 'About',
      chat: 'Chatbox',
      calculator: 'Calculator',
      shop: 'Shop'
    };

    if (appMap[appName]) {
      handleOpenWindow(appMap[appName]);
    }
  };

  const addRunningApp = (appName) => {
    if (!runningApps.some(app => app.name === appName)) {
      setRunningApps([
        ...runningApps,
        {
          id: appName.toLowerCase(),
          name: appName,
          minimized: false
        }
      ]);
    } else {
      // Unminimize if already exists
      setRunningApps(runningApps.map(app =>
        app.name === appName ? { ...app, minimized: false } : app
      ));
    }
  };

  const removeRunningApp = (appName) => {
    setRunningApps(runningApps.filter(app => app.name !== appName));
  };

  const handleTaskbarAppClick = (app) => {
    // Toggle minimization state
    setRunningApps(runningApps.map(a =>
      a.id === app.id ? { ...a, minimized: !a.minimized } : a
    ));

    // Focus/unminimize window
    handleOpenWindow(app.name);
  };

  return (
    <div>
      {loading && <Preloader />}
      {!loading && (
        <div>
          <Desktop onIconClick={handleIconClick} />

          {/* Use the combined component */}
          <TaskbarwStart
            runningApps={runningApps}
            onAppClick={handleTaskbarAppClick}
          />

          {/* Windows */}
          {isAboutOpen && (
            <About
              onClose={() => {
                handleCloseWindow('About');
                handleWindowToggle('About', false);
              }}
            />
          )}

          {isChatboxWindowOpen && !runningApps.find(app => app.name === 'Chatbox')?.minimized && (
            <ChatboxWindow
              onClose={() => {
                handleCloseWindow('Chatbox');
                handleWindowToggle('Chatbox', false);
              }}
            />
          )}

          {isCalculatorWindowOpen && !runningApps.find(app => app.name === 'Calculator')?.minimized && (
            <CalculatorWindow
              onClose={() => {
                handleCloseWindow('Calculator');
                handleWindowToggle('Calculator', false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;