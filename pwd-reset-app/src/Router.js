// App.js or Main Router file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PasswordReset from './PasswordReset';
import ResetConfirmation from './resetConfirmation'; // Your destination component
import EmailSend from "./EmailSend";
// import Login from './login';
import PolicyReader from "./policyReader"
import UserActions from "./selectAction"
import LoginPage from "./loginPage"
import AdminLogin from "./AdminLoginPage"
import PasswordChange from "./changepassword"
import AdminPasswordChange from "./admin-changepassword"
import AdminActions from "./admin-actions"

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/reset-confirmation" element={<ResetConfirmation />} />
            <Route path="/email-send" element={<EmailSend />} />
            <Route path="/" element={<LoginPage />} />
            {/*<Route path="/" element={<Login />} />*/}
            <Route path='/policy-reader' element={<PolicyReader />}/>
            <Route path='/select-action' element={<UserActions />}/>
            <Route path='/admin-login' element={<AdminLogin />}/>
            <Route path='/change-password' element={<PasswordChange />}/>
            <Route path="/admin-change-password" element={<AdminPasswordChange />}/>
            <Route path="/admin-actions" element={<AdminActions />}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
