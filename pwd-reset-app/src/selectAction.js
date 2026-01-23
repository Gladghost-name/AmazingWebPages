import React from "react";
// We import the same CSS to keep the "Look and Feel" identical
import "./selectAction.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export default function UserActions() {

    const navigate = useNavigate();
    // toast.success('Welcome back!', { theme: "colored" });
    
    // Handlers for the specific actions
    const handleReset = () => {
        console.log("Redirecting to Password Reset...");
        navigate('/email-send');
    };

    const handlePolicy = () => {
        console.log("Redirecting to Policy Page...");
        navigate('/policy-reader');
    };

    return (
        <div className="login-container">
            {/* We reuse 'login-card' for the white box styling */}
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored" 
                />

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
            </div>
        </div>
    );
}
