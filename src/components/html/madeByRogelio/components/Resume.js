import React from 'react';

const Resume = () => (
    <>
        <h1 className="tab blink">Looking for a Marketing Specialist?</h1>
        <p>Take a gander at my</p>
        <img className="intro about-image" src="https://i.imgur.com/O9wmDbr.gif" alt="90s-style animated name image" />

        <div id="resume-preview">
            <h2>Curriculum Vitae Preview</h2>
            <iframe src="../files/rogelio_mendoza_resume.pdf" width="100%" height="600px"
                style={{ border: '2px solid yellow', boxShadow: '10px 10px 0 blue', position: 'relative' }}>
            </iframe>
        </div>
        <p><a href="../files/rogelio_mendoza_resume.pdf" download="rogelio_mendoza_resume.pdf">Download My Resume</a></p>
    </>
);

export default Resume;
