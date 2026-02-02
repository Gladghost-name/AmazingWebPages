import React, { useState } from 'react';
import logo from './vdt-logo.png';
import { IoEye, IoEyeOff, IoMailOutline, IoLockClosedOutline } from "react-icons/io5"; 
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './loginPage.css'; 

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields.', { theme: "colored" });
            return;
        }

        setIsLoading(true);

        // Simulate API Call
        console.log("Login Payload:", { ...formData });

        // Mock Success
        console.log(formData)

     const handleLogin = async () => {
    try {
        const response = await fetch('http://192.168.137.241:8080/api/ad/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // Added Content-Type so the server can read the JSON
                'Content-Type': 'application/json' 
                // Removed 'Access-Control-Allow-Origin'
            },
            body: JSON.stringify(formData)
        });

            const data = await response.json();

            if (!data.valid) {
                toast.error("Invalid Credentials", { theme: "colored" });
                setIsLoading(false);
            } else {
                toast.success("Login Successful!");
                localStorage.setItem('user', formData.email);
                localStorage.setItem('token', data.token);
                
                setTimeout(() => {
                    navigate("/select-action");
                }, 1500);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Connection failed. Check your network.");
            setIsLoading(false);
        }
    };

    return (
        <div className='page-wrapper'>
            <ToastContainer />

            <div className='auth-card'>
                {/* Logo Section */}
                <div className="brand-section">
                    <img src={logo} alt='VDT LOGO' className="logo"/>
                </div>

                {/* Header */}
                <div className="header-section">
                    <h2>Welcome Back</h2>
                    <p>Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
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
                                required
                                disabled={isLoading}
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
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;