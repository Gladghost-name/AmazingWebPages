import React, { useState } from 'react';
import logo from './vdt-logo.png'; // Ensure path is correct
import './loginPage.css'; // We will create this file below
import { IoEye, IoEyeOff, IoMailOutline, IoLockClosedOutline } from "react-icons/io5"; 
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    // Basic Validation
    if (!formData.email || !formData.password) {
        toast.error('Please fill in all fields.', { theme: "colored" });
        return;
    }

    setIsLoading(true);

    // Simulate API Call
    console.log("Login Payload:", { ...formData, rememberMe });
    
    setTimeout(() => {
        // Mock Success
        setIsLoading(false);
        toast.success('Welcome back!', { theme: "colored" });
        // navigate("/dashboard"); 
    }, 2000); 
};

return (
    <div className='login-container'>
    <ToastContainer position="top-right" autoClose={4000} theme="colored" />

    <div className='login-card'>
        
        {/* Logo Section */}
        <div className="logo-wrapper">
            <img src={logo} alt='VDT LOGO' className="login-logo"/>
        </div>

        {/* Header */}
        <div className="login-header">
        <h2>Welcome Back</h2>
        <p>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {/* Email Input */}
        <div className='input-group'>
        <label htmlFor="email">Email Address</label>
        <div className="input-wrapper">
            <span className="input-icon"><IoMailOutline size={20}/></span>
            <input 
                type="email" 
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                autoComplete="email"
                required
            />
        </div>
        </div>

          {/* Password Input */}
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
                placeholder="Enter your password"
                autoComplete="current-password"
                required
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

          {/* Remember Me & Forgot Password */}
        <div className="actions-row">
        <label className="remember-me">
            <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
        </label>
        
        <Link to="/email-send" className="forgot-password-link">
            Forgot Password?
        </Link>
        </div>

          {/* Submit Button */}
        <button type="submit" className='button-primary' disabled={isLoading}>
            {isLoading ? (
                <div className="loader-wrapper">
                    <span className="loader"></span>
                    <span>Signing in...</span>
                </div>
            ) : (
                "Sign In"
            )}
        </button>
        </form>

        {/* Footer / Sign Up */}
        <div className="login-footer">
            <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
        </div>

        </div>
    </div>
    );
};

export default Login;
