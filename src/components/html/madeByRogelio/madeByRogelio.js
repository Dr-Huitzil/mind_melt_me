import React, { useState } from 'react';
import '../madeByRogelio/styles/madeByRogelio.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WorldClock from './components/WorldClock';
import Home from './components/Home';
import Services from './components/Services';
import Resume from './components/Resume';
import Contact from './components/Contact';

export default function MadeByRogelio() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <Home />;
            case 'services': return <Services />;
            case 'resume': return <Resume />;
            case 'contact': return <Contact />;
            default: return <Home />;
        }
    };

    return (
        <div className="made-by-rogelio-wrapper center bg2 max">
            <WorldClock />
            <div id="main">
                <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
                {renderPage()}
                <Footer />
            </div>
        </div>
    );
}
