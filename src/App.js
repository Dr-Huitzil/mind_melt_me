import React, { useEffect, useState } from 'react';
import Preloader from './components/Prelaoder';
import './styles/global.css';
import Desktop from './components/Desktop';
import StartMenu from './components/StartMenu';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(false);

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


  return (
    <div>
      {loading && <Preloader />}
      {!loading && (
        <div>
          <Desktop />
          {startMenuVisible && <StartMenu onClose={closeStartMenu} />}
          <button className='start-button' onClick={toggleStartMenu}>
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
