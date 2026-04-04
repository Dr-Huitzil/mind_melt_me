import React, { useState, useEffect } from "react";

const Clock = () => {
    const [currentTime, setCurrentTime] = useState('12:00 PM');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours || 12; // The hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;

            setCurrentTime(`${hours}:${minutes} ${ampm}`);
        };

        const timer = setInterval(updateClock, 1000);
        updateClock(); // Initial call to set the time immediatelly
        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="taskbar-time" aria-live="off">
            {currentTime}
        </div>
    );
};

export default React.memo(Clock);