import React from "react";
import logo from './vdt-logo.png';
import { 
    IoShieldCheckmarkOutline, 
    IoPeopleOutline, 
    IoSettingsOutline, 
    IoArrowForwardOutline, 
    IoLogOutOutline,
    IoDocumentLockOutline 
} from "react-icons/io5"; 
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./selectAction.css";

export default function AdminActions() {
    const navigate = useNavigate();

    const handleAdminReset = () => {
        // Navigates to the admin version of the password reset
        navigate('/admin-change-password');
    };

    const handleSystemPolicy = () => {
        navigate('/policy-reader');
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/admin-login');
    };

    return (
        <div className="page-wrapper">
            <ToastContainer />

            <div className="auth-card admin-action-card">
                <div className="brand-section">
                    <img src={logo} alt='VDT LOGO' className="logo"/>
                </div>

                <div className="header-section">
                    <div className="admin-status-badge">
                        <IoShieldCheckmarkOutline /> <span>System Administrator</span>
                    </div>
                    <h2>Admin Control Center</h2>
                    <p>Select a management module to proceed.</p>
                </div>

                <div className="action-grid">

                    {/* Action 1: Admin Password Override */}
                    <div className="action-item" onClick={handleAdminReset}>
                        <div className="action-icon-wrapper admin-pink">
                            <IoSettingsOutline size={24} />
                        </div>
                        <div className="action-text">
                            <h3>Reset User Password</h3>
                            <p>Force update a user's credentials</p>
                        </div>
                        <IoArrowForwardOutline className="arrow-icon" />
                    </div>

                    {/* Action 2: System Policies */}
                    <div className="action-item" onClick={handleSystemPolicy}>
                        <div className="action-icon-wrapper admin-slate">
                            <IoDocumentLockOutline size={24} />
                        </div>
                        <div className="action-text">
                            <h3>System Policies</h3>
                            <p>Configure and review global rules</p>
                        </div>
                        <IoArrowForwardOutline className="arrow-icon" />
                    </div>
                </div>

                <div className='footer-section'>
                    <button className='btn-back logout-text' onClick={handleLogout}>
                        <IoLogOutOutline size={18} /> Terminate Admin Session
                    </button>
                </div>
            </div>
        </div>
    );
}