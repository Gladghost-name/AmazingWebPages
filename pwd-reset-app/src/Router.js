// App.js or Main Router file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PasswordReset from './PasswordReset';
import ResetConfirmation from './resetConfirmation'; // Your destination component
import EmailSend from "./EmailSend";
import Login from './login';
import PolicyReader from "./policyReader"
import LoginPage from "./loginPage"

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/reset-confirmation" element={<ResetConfirmation />} />
            <Route path="/email-send" element={<EmailSend />} />
            <Route path="/" element={<Login />} />
            <Route path="/login-page" element={<LoginPage />} />
            <Route path='/policy-reader' element={<PolicyReader />}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
