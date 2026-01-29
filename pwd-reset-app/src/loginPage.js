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

        // Parse the JSON response from the server
        const data = await response.json();
        console.log(data)

        

        // Check for specific error status codes (e.g., 401 for Invalid Credentials)
        if (!data.valid) {
            console.log("Invalid credentials.")
            toast.error("Invalid Credentials", {
                position: 'top-right',
                autoClose: 3000,
                theme: "colored",
            });
            setIsLoading(false);
        }else {
            console.log(formData)
            toast.success("Login Successful!");
            
            setIsLoading(false);
            // toast.success('Welcome back!', { theme: "colored" });
            setTimeout(() => {
                navigate("/select-action");
            }, 1500);
            

            // TODO: Save the authentication token from 'data' to localStorage or state here
            localStorage.setItem('user',formData.email)
            localStorage.setItem('token', data.token);
        }

    } catch (error) {
        // This runs only on network errors (e.g., API is offline)
        console.error("Fetch error:", error);
        toast.error("Connection to AD API failed. Check your network.");
    }
};
        handleLogin()
       
};

return (
    <div className='login-container'>
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
        </div>
    </div>
    );
};

export default Login;
