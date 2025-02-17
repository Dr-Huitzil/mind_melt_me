import React, { useEffect, useState } from 'react';
import Preloader from './components/Prelaoder';
import Desktop from './components/Desktop';
import StartMenu from './components/StartMenu';
import './styles/global.css';
import Taskbar from './components/Taskbar';
//import AboutWindow from './components/windows/AboutWindow';
import About from './components/windows/about';
import ChatboxWindow from './components/windows/ChatboxWindow';
import CalculatorWindow from './components/windows/CalculatorWindow';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(false);
  const [runningApps, setRunningApps] = useState([]);
  //const [isAboutWindowOpen, setAboutWindowOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isChatboxWindowOpen, setChatboxWindowOpen] = useState(false);
  const [isCalculatorWindowOpen, setCalculatorWindowOpen] = useState(false);
  const [isShopWindowOpen, setShopWindowOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    const savedRunningApps = JSON.parse(localStorage.getItem('runningApps')) || [];
    setRunningApps(savedRunningApps);

    //setAboutWindowOpen(localStorage.getItem('isAboutWindowOpen') === 'true');
    setIsAboutOpen(localStorage.getItem('isAboutOpen') === 'true');
    setChatboxWindowOpen(localStorage.getItem('isChatboxWindowOpen') === 'true');
    setCalculatorWindowOpen(localStorage.getItem('isCalculatorWindowOpen') === 'true');
    setShopWindowOpen(localStorage.getItem('isShopWindowOpen') === 'true');

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('runningApps', JSON.stringify(runningApps));
    //localStorage.setItem('isAboutWindowOpen', isAboutWindowOpen);
    localStorage.setItem('isAboutOpen', isAboutOpen);
    localStorage.setItem('isChatboxWindowOpen', isChatboxWindowOpen);
    localStorage.setItem('isCalculatorWindowOpen', isCalculatorWindowOpen);
    localStorage.setItem('isShopWindowOpen', isShopWindowOpen);
  }, [runningApps, isAboutOpen, isChatboxWindowOpen, isCalculatorWindowOpen, isShopWindowOpen]);

  const toggleStartMenu = () => {
    setStartMenuVisible(!startMenuVisible);
  };

  const closeStartMenu = () => {
    setStartMenuVisible(false);
  };

  // const handleOpenAboutWindow = () => {
  //   setAboutWindowOpen(true);
  //   addRunningApp('About');
  // };

  // const handleCloseAboutWindow = () => {
  //   setAboutWindowOpen(false);
  //   removeRunningApp('About');
  // };

  const handleOpenAboutWindow = () => {
    setIsAboutOpen(true);
    addRunningApp('About');
  }

  const handleCloseAboutWindow = () => {
    setIsAboutOpen(false);
    removeRunningApp('About');
  }

  const handleOpenChatboxWindow = () => {
    setChatboxWindowOpen(true);
    addRunningApp('Chatbox');
  };

  const handleCloseChatboxWindow = () => {
    setChatboxWindowOpen(false);
    removeRunningApp('Chatbox');
  };

  const handleOpenCalculatorWindow = () => {
    setCalculatorWindowOpen(true);
    addRunningApp('Calculator');
  };

  const handleCloseCalculatorWindow = () => {
    setCalculatorWindowOpen(false);
    removeRunningApp('Calculator');
  };

  const handleOpenShopWindow = () => {
    setShopWindowOpen(true);
    addRunningApp('Shop');
  };

  // const handleCloseShopWindow = () => {
  //   setShopWindowOpen(false);
  //   removeRunningApp('Shop');
  // };

  const handleIconClick = (appName) => {
    switch (appName) {
      case 'about':
        handleOpenAboutWindow();
        break;
      case 'chat':
        handleOpenChatboxWindow();
        break;
      case 'calculator':
        handleOpenCalculatorWindow();
        break;
      case 'shop':
        handleOpenShopWindow();
        break;
      default:
        break;
    }
  };

  const addRunningApp = (appName) => {
    if (!runningApps.includes(appName)) {
      setRunningApps([...runningApps, appName]);
    }
  };

  const removeRunningApp = (appName) => {
    setRunningApps(runningApps.filter(app => app !== appName));
  };

  const handleTaskbarAppClick = (appName) => {
    switch (appName) {
      case 'About':
        handleOpenAboutWindow();
        break;
      case 'Chatbox':
        handleOpenChatboxWindow();
        break;
      case 'Calculator':
        handleOpenCalculatorWindow();
        break;
      case 'Shop':
        handleOpenShopWindow();
        break;
      default:
        break;
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
          <Taskbar runningApps={runningApps} onAppClick={handleTaskbarAppClick} />
          <button className='start-button' onClick={toggleStartMenu}>
            Start
          </button>
          {/* {isAboutWindowOpen && <AboutWindow onClose={handleCloseAboutWindow} />} */}
          {isAboutOpen && <About onClose={handleCloseAboutWindow} />}
          {isChatboxWindowOpen && <ChatboxWindow onClose={handleCloseChatboxWindow} />}
          {isCalculatorWindowOpen && <CalculatorWindow onClose={handleCloseCalculatorWindow} />}
        </div>
      )}
    </div>
  );
};

export default App;
