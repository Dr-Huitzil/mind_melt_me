import React, { useEffect, useState } from "react";
import '../styles/Preloader.css'

const Preloader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 5;
            });
        }, 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="preloader">
            <div className="loading-img-bounce"></div>
            <div className="loading-text">
                Loading....<span id="progress">{progress}%</span>
            </div>
            <br />
            <br />
            <div className="loading-container">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="loading-block" style={{ opacity: progress >= (i + 1) * 5 ? 1 : 0 }}></div>
                ))}
            </div>
        </div>
    );

};
export default Preloader;