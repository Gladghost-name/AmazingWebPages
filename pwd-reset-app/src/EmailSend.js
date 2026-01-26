import logo from './vdt-logo.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailSend.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 1. Start Loading
        setIsLoading(true);

        // 2. Simulate API Call (wait 2 seconds)
        setTimeout(() => {
            
            // 3. Trigger Red Toast (Error style)
            // Note: toast.error is red by default in React-Toastify
            // toast.error('Unable to verify email. Redirecting anyway...', {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored", // "colored" makes the whole box red, not just the bar
            // });

            

            // 4. Stop Loading and Navigate
            // We wait a slight moment so the user sees the toast before the page changes
            setTimeout(() => {
                setIsLoading(false);
                // navigate('/mail-sent');
                toast.success('Reset link sent to: ' + email + ". please check your mail.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }, 2000); 

        }, 2000); // 2 second mock delay for the "sending" animation
    }
    
    return (
    <div className='container'>
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

        <div className='card'>

        <img
            src={logo}
            alt='VDT LOGO'
            style={{
            width: "100px",
            // 1. Make it a block element so it takes up full width space
            display: 'block',
            // 2. Set top/bottom margin to 0 (or whatever you need),
            //    and left/right margins to 'auto' to center it.
            margin: '0 auto 5px auto' // Added 20px bottom margin for spacing from the title
    }}
/>


        {/* Headings */}
        <div>
            <h2 style={{ margin: '0 0 1px 0'}}>Forgot Password</h2>
            <p>Please enter a valid email address associated with your account.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Email Input */}
            <div className='inputGroup'>
                <label className='newPwdLabel'>Enter email address</label>
                <input 
                    type='email'
                    placeholder="Enter a valid email Address e.g. example.com"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    disabled={isLoading} // Disable input while sending
                />
            </div>

            {/* Action Button with Loader Logic */}
            <button 
                type="submit" 
                className='buttonPrimary' 
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? (
                    <>
                        <span className="loader"></span>
                        <span>Sending Link...</span>
                    </>
                ) : (
                    "Request reset link"
                )}
            </button>
        </form>

        </div>
    </div>
    );
};

export default PasswordReset;
