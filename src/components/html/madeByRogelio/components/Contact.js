import React from 'react';

const Contact = () => (
    <>
        <div id="contact-info">
            <p>If you have any questions or would like to reach out, feel free to contact me via email:</p>
            <p><strong>Email: <a href="mailto:rogeliom5801@gmail.com">rogeliom5801@gmail.com</a></strong></p>
            <p>Connect with me on <a href="https://www.linkedin.com/in/rogeliom5801/" target="_blank" rel="noreferrer">LinkedIn</a></p>
        </div>

        <div id="donate-section">
            <p>While you're here, please take a moment to consider donating to <strong>Doctors Without Borders</strong>. This incredible organization provides life-saving medical care in crisis zones around the world, and I truly love the work they do.</p>
            <p>Your support can make a difference!</p>
            <a href="https://donate.doctorswithoutborders.org" target="_blank" rel="noreferrer">
                <button className="donate-btn">Donate to Doctors Without Borders</button>
            </a>
        </div>

        <a href="https://www.youtube.com/watch?v=ZuyhdtAxnz4&list=LL&index=2" target="_blank" rel="noreferrer">
            <button id="hidden-button">Hidden Button</button>
        </a>
    </>
);

export default Contact;
