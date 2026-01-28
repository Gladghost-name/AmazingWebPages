import logo from './vdt-logo.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailSend.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported
import { render } from '@react-email/components';
import { Resend } from 'resend';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 1. Start Loading
        setIsLoading(true);

        // async function sendEmail(from, to, subject, emailhtml) {
        //     // 1. Render the component to HTML string
        //     const emailHtml = await render(<VDTResetPassword />);

        //     // 2. Send via your provider
        //     await resend.emails.send({
        //     from: from,
        //     to: to,
        //     subject: subject,
        //     html: emailHtml,
        //     });
        // }

        // 2. Simulate API Call (wait 2 seconds)
        setTimeout(() => {
            // 4. Stop Loading and Navigate
            // We wait a slight moment so the user sees the toast before the page changes
            // sendEmail()
            setIsLoading(false);

            // check if mail is valid
            if (email !== "adaraademide@gmail.com"){
                toast.error("Invalid Email: Enter a valid email to continue.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }else{
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
            }
        }, 1000); // 2 second mock delay for the "sending" animation
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
