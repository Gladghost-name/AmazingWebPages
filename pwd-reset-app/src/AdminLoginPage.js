import React, { useState } from 'react';
import logo from './vdt-logo.png';
import adminVisual from './assets/policies.avif'; // Add your admin photo here
import { IoEye, IoEyeOff, IoMailOutline, IoLockClosedOutline, IoShieldCheckmarkOutline } from "react-icons/io5"; 
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './AdminLoginPage.css'; 

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://192.168.137.241:8080/api/ad/auth/login', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!data.valid) {
                toast.error("Invalid Admin Credentials", { theme: "colored" });
                setIsLoading(false);
            } else {
                toast.success("Admin Access Granted!");
                localStorage.setItem('user', formData.email);
                localStorage.setItem('token', data.token);
                setTimeout(() => navigate("/admin-dashboard"), 1500);
            }
        } catch (error) {
            toast.error("Connection failed.");
            setIsLoading(false);
        }
    };

    return (
        <div className='page-wrapper'>
            <ToastContainer />

            <div className='admin-split-card'>
                {/* Left Side: Form */}
                <div className='form-section'>
                    <div className="brand-section">
                        <img src={logo} alt='VDT LOGO' className="logo"/>
                    </div>

                    <div className="header-section">
                        <div className="admin-badge">
                            <IoShieldCheckmarkOutline /> <span>Admin Portal</span>
                        </div>
                        <h2>Welcome Back</h2>
                        <p>Secure login for system administrators.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className='input-group'>
                            <label htmlFor="email">Admin Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon"><IoMailOutline size={20}/></span>
                                <input 
                                    type="email" 
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@vdt.com"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className='input-group'>
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon"><IoLockClosedOutline size={20}/></span>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                        </div>

                        <div className="actions-row">
                            <Link to="/email-send" className="forgot-password-link">
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className='btn-submit' disabled={isLoading}>
                            {isLoading ? (
                                <div className="loader-container">
                                    <span className="spinner"></span>
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                "Authorize Login"
                            )}
                        </button>
                    </form>
                </div>

                {/* Right Side: Photo */}
                <div className='visual-section' style={{ backgroundImage: `url(${adminVisual})` }}>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;