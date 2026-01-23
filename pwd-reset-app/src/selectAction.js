import React from "react";
// We import the same CSS to keep the "Look and Feel" identical
import "./selectAction.css"; 
export default function UserActions() {
    
    // Handlers for the specific actions
    const handleReset = () => {
        console.log("Redirecting to Password Reset...");
        // navigate('/reset-password');
    };

    const handlePolicy = () => {
        console.log("Redirecting to Policy Page...");
        // navigate('/policy');
    };

    return (
        <div className="login-container">
            {/* We reuse 'login-card' for the white box styling */}
            <div className="login-card">
                <h2>Account Options</h2>
                <p className="subtitle">How can we help you today?</p>

                {/* spacer for visual balance similar to the input groups */}
                <div style={{ marginTop: "2rem" }}></div>

                {/* Action 1: Reset Password */}
                <button 
                    className="login-btn" 
                    onClick={handleReset}
                    style={{ marginBottom: "1rem" }} // Add spacing between buttons
                >
                    Reset Password
                </button>

                {/* Action 2: Read Policy */}
                {/* We use the same class but override background color to differentiate */}
                <button 
                    className="login-btn" 
                    onClick={handlePolicy}
                    style={{ backgroundColor: "#6c757d" }} 
                >
                    Read Policy
                </button>

                <p className="footer-text">
                    Done here? <span style={{cursor: "pointer"}}>Go Back</span>
                </p>
            </div>
        </div>
    );
}
