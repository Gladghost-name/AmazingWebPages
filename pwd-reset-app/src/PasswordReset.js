import logo from './vdt-logo.png';
import React, { useState } from 'react';
import './PasswordReset.css';
import { IoEye, IoEyeOff } from "react-icons/io5"; 
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');


  // Helper to determine style based on strength state
  const getStrengthStyles = (strength) => {
    switch (strength.toLowerCase()) {
      case 'weak':
        return { color: '#ef4444', width: '33%', label: 'Weak', margin: '0px', marginBottom: "12px"}; // Red
      case 'medium':
        return { color: '#eab308', width: '66%', label: 'Medium', margin: '0px', marginBottom: "12px"}; // Yellow/Orange
      case 'strong':
        return { color: '#22c55e', width: '100%', label: 'Strong', margin: '0px', marginBottom: "12px"}; // Green
      default:
        return { color: '#e5e7eb', width: '0%', label: '', margin: '0px', marginBottom: "12px"}; // Grey/Empty
    }
  };

  const strengthStyle = getStrengthStyles(strength || '');


  // Simple function to check password strength
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
      toast.error('Passwords does not match.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", // "colored" makes the whole box red, not just the bar
      });
      return;
    }

    // 1. Start Loading
    setIsLoading(true);

    try {
        // 2. Send the POST request
        const response = await fetch('https://api.example.com/confirm-reset', { // <--- Placeholder Endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
    <div  className='container'>
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
        
        <img src={logo} alt='VDT LOGO' style={{position: 'relative', width: 100, left: '32%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}/>

        {/* Headings */}
        <div>
          <h2 style={{ margin: '0 0 5px 0'}}>Reset Password</h2>

          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Your new password must be different to previously used passwords. 
          </p>

        </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {/* New Password Input */}
      <div className='inputGroup'>
        <label className='newPwdLabel'>New Password</label>
        
        <div className="passwordInputWrapper">
            <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                placeholder="Enter new password"
                required
            />
            <button 
                type="button" 
                className="passwordToggleIcon" 
                onClick={() => setShowPassword(!showPassword)}
            >

                {showPassword ? (
                    <IoEyeOff size={20} /> 
                ) : (
                    <IoEye size={20} />
                )}
            </button>
        </div>
        
        <div className='inputGroup'>
      {/* Improved Strength Indicator */}
      {strength && (
          <div className="strength-container" style={{ margin: '0px' }}>
              {/* The Visual Bar */}
              <div className="strength-bar-bg">
                  <div 
                      className="strength-bar-fill" 
                      style={{ 
                          width: strengthStyle.width, 
                          backgroundColor: strengthStyle.color ,
                          margin: '0px'
                      }} 
                  />
              </div>
              
              {/* The Text Label */}
              <p 
                  className="strength-text" 
                  style={{ color: strengthStyle.color, margin: '0px', fontSize: "14px"}}
              >
                  Strength: {strengthStyle.label}
              </p>
          </div>
      )}
</div>
      </div>

      {/* Confirm Password Input */}
      <div className='inputGroup'>
        <label className='newPwdLabel'>Confirm Password</label>
        
        <div className="passwordInputWrapper">
            <input 
                type={showPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
            />

            <button 
                type="button" 
                className="passwordToggleIcon" 
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                  <IoEyeOff size={20} />
              ) : (
                  <IoEye size={20} />
              )}
            </button>
        </div>

      </div>
          {/* Action Buttons */}
          <button type="submit" className='buttonPrimary' disabled={isLoading}>
            {isLoading ? (
                  <>
                      <span className="loader"></span>
                      <span>Reset Password</span>
                  </>
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

