import React, { useEffect, useState } from 'react';
import Preloader from './components/Prelaoder';
import Desktop from './components/Desktop';
import StartMenu from './components/StartMenu';
import Taskbar from './components/Taskbar';
import AboutWindow from './components/windows/AboutWindow';
import ChatboxWindow from './components/windows/ChatboxWindow';
import CalculatorWindow from './components/windows/CalculatorWindow'; // Import CalculatorWindow
import './styles/global.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(false);
  const [openWindows, setOpenWindows] = useState({
    about: false,
    chatbox: false,
    calculator: false, // Add calculator window state
    // Add more windows here
  });

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
    setOpenWindows({ ...openWindows, [appName]: true });
  };

  const closeWindow = (appName) => {
    setOpenWindows({ ...openWindows, [appName]: false });
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
          <Taskbar runningApps={[]} />
          <button className='start-button' onClick={toggleStartMenu}>
            Start
          </button>

          {openWindows.about && <AboutWindow onClose={() => closeWindow('about')} />}
          {openWindows.chatbox && <ChatboxWindow onClose={() => closeWindow('chatbox')} />}
          {openWindows.calculator && <CalculatorWindow onClose={() => closeWindow('calculator')} />}
          {/* Add more windows here */}
        </div>
      )}
    </div>
  );
};

export default App;
