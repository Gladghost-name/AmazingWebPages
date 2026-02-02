import React, { useState } from 'react';
import logo from './vdt-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './EmailSend.css';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // 2. Send the POST request
            const response = await fetch('https://api.example.com/reset-password', {  // <--- Placeholder Endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email 
                }),
            });

            if (response.ok) {
                toast.success(`Reset link sent to: ${email}`, {
                    theme: "colored",
                });
            } else {
                toast.error("Account not found. Please try again.", {
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error("Network Error: Please check your connection.", {
                theme: "colored",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='page-wrapper'>
            <ToastContainer />
            
            <div className='auth-card'>
                <div className='brand-section'>
                    <img src={logo} alt='Company Logo' className='logo' />
                </div>

                <div className='header-section'>
                    <h2>Forgot Password?</h2>
                    <p>Enter your email and we'll send you a link to reset your password.</p>
                </div>

                <form onSubmit={handleSubmit} className='reset-form'>
                    <div className='input-group'>
                        <label htmlFor="email">Email Address</label>
                        <input 
                            id="email"
                            type='email'
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className='btn-submit' 
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loader-container">
                                <span className="spinner"></span>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>

                <div className='footer-section'>
                    <button className='btn-back' onClick={()=>navigate("/")}>Back to Login</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;