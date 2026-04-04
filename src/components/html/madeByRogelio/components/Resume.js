import React from 'react';
import resumePdf from '../files/rogelio_mendoza_resume.pdf';

const Resume = () => (
    <>
        <p>Take a gander at my</p>
        <img className="intro about-image" src="https://i.imgur.com/O9wmDbr.gif" alt="90s-style animated name" />

        <div id="resume-preview">
            <h2>Curriculum Vitae Preview</h2>
            <iframe src={resumePdf} width="100%" height="600px" title="Resume PDF Preview"
                style={{ border: '2px solid yellow', boxShadow: '10px 10px 0 blue', position: 'relative' }}>
            </iframe>
        </div>
        <p><a href={resumePdf} download="rogelio_mendoza_resume.pdf">Download My Resume</a></p>
    </>
);

export default Resume;
