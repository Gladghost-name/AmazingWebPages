import logo from './vdt-logo.png';
import React, { useState, useEffect } from 'react';
import { IoEye, IoEyeOff, IoLockClosedOutline } from "react-icons/io5"; 
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './PasswordReset.css';

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  console.log(token);

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

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
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/) && pass.match(/[0-9]/) && pass.length > 8) {
            return 'Strong';
        }
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

    // 1. Start Loading
    setIsLoading(true);

    try {
        // 2. Send the POST request
        const response = await fetch('http://192.168.137.241:8080/api/ad/auth/reset-password', { // <--- Placeholder Endpoint
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                token: token,               // Ensure you have this variable defined (e.g., from URL params)
                newPassword: password,
                confirmPassword: confirmPassword 
            }),
        });

        // 3. Check for Success (200 OK)
        if (response.ok) {
            // Success: Password changed
            toast.success("Password reset successfully!", {
                position: "top-right",
                theme: "colored",
            });

            // Navigate ONLY if successful
            navigate("/reset-confirmation");
            
        } else {
            // Failure: Show error from server (or default message)
            toast.error("Failed to reset password. Please try again or request a new link.", {
                position: "top-right",
                theme: "colored",
            });
        }

    } catch (error) {
        // Network/Connection Errors
        console.error("Submission Error:", error);
        toast.error("Network Error: Please check your connection.", {
            position: "top-right",
            theme: "colored",
        });

    } finally {
        // 4. Stop Loading (always runs)
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
                    <h2>Reset Password</h2>
                    <p>Your new password must be different from previously used passwords.</p>
                </div>

                <form onSubmit={handleSubmit} className='auth-form'>
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
                        
                        {/* Strength Indicator */}
                        {strength && (
                            <div className="strength-container">
                                <div className="strength-bar-bg">
                                    <div 
                                        className="strength-bar-fill" 
                                        style={{ width: strengthStyle.width, backgroundColor: strengthStyle.color }} 
                                    />
                                </div>
                                <span className="strength-text" style={{ color: strengthStyle.color }}>
                                    {strengthStyle.label}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div className='input-group'>
                        <label>Confirm Password</label>
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
                                <span>Updating...</span>
                            </div>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;