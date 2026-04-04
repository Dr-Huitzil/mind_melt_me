import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => (
    <nav id="home">
        <h4>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a> <span className="line">|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); }}>Services</a> <span className="line">|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('resume'); }}>Resume</a> <span className="line">|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Contact</a>
        </h4>
    </nav>
);

export default Navigation;
