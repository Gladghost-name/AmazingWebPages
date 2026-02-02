import logo from './vdt-logo.png';
import React, { useState } from 'react';
import { IoEye, IoEyeOff, IoLockClosedOutline, IoMailOutline, IoShieldCheckmarkOutline } from "react-icons/io5"; 
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './PasswordReset.css'; // Reusing the same modern styles

const AdminPasswordChange = () => {
    const [targetEmail, setTargetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Strength helper
    const getStrengthStyles = (strength) => {
        switch (strength.toLowerCase()) {
            case 'weak': return { color: '#ef4444', width: '33%', label: 'Weak' };
            case 'medium': return { color: '#eab308', width: '66%', label: 'Medium' };
            case 'strong': return { color: '#22c55e', width: '100%', label: 'Strong' };
            default: return { color: '#e5e7eb', width: '0%', label: '' };
        }
    };

    const strengthStyle = getStrengthStyles(strength || '');

    const checkStrength = (pass) => {
        if (pass.length === 0) return '';
        if (pass.length < 6) return 'Weak';
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/) && pass.match(/[0-9]/) && pass.length > 8) return 'Strong';
        return 'Medium';
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        setStrength(checkStrength(val));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.', { theme: "colored" });
            return;
        }

        setIsLoading(true);
        try {
            // Admin endpoint usually requires the admin's token from localStorage
            const adminToken = localStorage.getItem('token');

            const response = await fetch('https://api.example.com/admin/reset-user-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}` // Admin authorization
                },
                body: JSON.stringify({ 
                    email: targetEmail, 
                    newPassword: password 
                }),
            });

            if (response.ok) {
                toast.success(`Password for ${targetEmail} updated!`, { theme: "colored" });
                setTargetEmail('');
                setPassword('');
                setConfirmPassword('');
                setStrength('');
            } else {
                toast.error("Failed to update password. Check admin permissions.", { theme: "colored" });
            }
        } catch (error) {
            toast.error("Network Error: Please try again.", { theme: "colored" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='page-wrapper'>
            <ToastContainer />

            <div className='auth-card'>
                <div className='brand-section'>
                    <img src={logo} alt='VDT LOGO' className='logo' />
                </div>

                <div className='header-section'>
                    <div className="admin-badge" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255, 0, 157, 0.1)',
                        color: '#ff009d',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        marginBottom: '10px',
                        textTransform: 'uppercase'
                    }}>
                        <IoShieldCheckmarkOutline /> <span>Admin Override</span>
                    </div>
                    <h2>Reset User Password</h2>
                    <p>Enter the user's email address and the new password below.</p>
                </div>

                <form onSubmit={handleSubmit} className='auth-form'>
                    
                    {/* Target User Email */}
                    <div className='input-group'>
                        <label>AD Email</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><IoMailOutline size={20}/></span>
                            <input 
                                type="email" 
                                value={targetEmail}
                                onChange={(e) => setTargetEmail(e.target.value)}
                                placeholder="user@company.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* New Password Input */}
                    <div className='input-group'>
                        <label>New Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><IoLockClosedOutline size={20}/></span>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                            <button 
                                type="button" 
                                className="password-toggle" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </button>
                        </div>
                        
                        {strength && (
                            <div className="strength-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                                <div className="strength-bar-bg" style={{ flexGrow: 1, height: '6px', background: '#edf2f7', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div 
                                        className="strength-bar-fill" 
                                        style={{ width: strengthStyle.width, backgroundColor: strengthStyle.color, height: '100%', transition: '0.3s' }} 
                                    />
                                </div>
                                <span className="strength-text" style={{ color: strengthStyle.color, fontSize: '12px', fontWeight: '600' }}>
                                    {strengthStyle.label}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div className='input-group'>
                        <label>Confirm New Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><IoLockClosedOutline size={20}/></span>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button type="submit" className='btn-submit' disabled={isLoading}>
                        {isLoading ? (
                            <div className="loader-container">
                                <span className="spinner"></span>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            "Update User Password"
                        )}
                    </button>

                    <button type="button" className='btn-back' onClick={() => navigate(-1)} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontSize: '14px' }}>
                        Cancel and Go Back
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminPasswordChange;