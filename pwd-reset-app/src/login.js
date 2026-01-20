import { useState } from "react";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    };

    return (
    <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Please sign in to continue</p>

        <div className="input-group">
            <label>Email</label>
            <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>

        <div className="input-group">
            <label>Password</label>
            <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>

        <button type="submit" className="login-btn">
            Login
        </button>

        <p className="footer-text">
            Forgot your password? <span>Reset</span>
        </p>
        </form>
    </div>
    );
}