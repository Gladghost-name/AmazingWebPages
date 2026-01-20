import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './resetConfirmation.css'; // We will create this next

// Import your assets
import animatedTick from './icons8-tick-96.gif';
import staticTick from './icons8-tick-static-96.png'; // The final frame of the gif

const ResetConfirmation = () => {
    const navigate = useNavigate();
    
    // State to toggle between the animated GIF and the static image
    const [iconSource, setIconSource] = useState(animatedTick);

    useEffect(() => {
        // Assume the GIF takes 1.5 seconds (1500ms) to play.
        // Change this number to match the actual length of your GIF.
        const timer = setTimeout(() => {
            setIconSource(staticTick);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="container">
            <div className="card confirmation-card">
                
                {/* 1. Animated Tick Icon */}
                <div className="icon-wrapper">
                    <img 
                        src={iconSource} 
                        alt="Success Tick" 
                        className="success-icon"
                    />
                </div>

                {/* 2. Success Message Box */}
                <div className="success-message-box">
                    <h2 className="success-title">Password Reset Successful</h2>
                    <p className="success-subtext">
                        Your password has been updated. You can now log in with your new credentials.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetConfirmation;
