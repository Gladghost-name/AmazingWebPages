import React from "react";
import logo from './vdt-logo.png';
import { IoKeyOutline, IoDocumentTextOutline, IoArrowForwardOutline, IoLogOutOutline } from "react-icons/io5"; 
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./selectAction.css";

export default function UserActions() {
    const navigate = useNavigate();

    const handleReset = () => {
        navigate('/change-password?token=' + localStorage.getItem("token"));
    };

    const handlePolicy = () => {
        navigate('/policy-reader');
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="page-wrapper">
            <ToastContainer />

            <div className="auth-card action-card-container">
                <div className="brand-section">
                    <img src={logo} alt='VDT LOGO' className="logo"/>
                </div>

                <div className="header-section">
                    <h2>Account Options</h2>
                    <p>How can we help you today?</p>
                </div>

                <div className="action-grid">
                    {/* Action 1: Change Password */}
                    <div className="action-item" onClick={handleReset}>
                        <div className="action-icon-wrapper">
                            <IoKeyOutline size={24} />
                        </div>
                        <div className="action-text">
                            <h3>Change Password</h3>
                            <p>Update your security credentials</p>
                        </div>
                        <IoArrowForwardOutline className="arrow-icon" />
                    </div>

                    {/* Action 2: Read Policy */}
                    <div className="action-item" onClick={handlePolicy}>
                        <div className="action-icon-wrapper secondary">
                            <IoDocumentTextOutline size={24} />
                        </div>
                        <div className="action-text">
                            <h3>Read Policy</h3>
                            <p>Review company terms and rules</p>
                        </div>
                        <IoArrowForwardOutline className="arrow-icon" />
                    </div>
                </div>

                <div className='footer-section'>
                    <button className='btn-back logout-text' onClick={handleLogout}>
                        <IoLogOutOutline size={18} /> Logout from session
                    </button>
                </div>
            </div>
        </div>
    );
}