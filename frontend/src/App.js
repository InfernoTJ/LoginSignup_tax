import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Passwordreset from './Pages/Passwordreset';
import Termsandcontions from './Pages/Termsandcontions';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import './App.css';
import { useAuthContext } from './Hooks/Useauthcontext';
function App() {
  const {user}=useAuthContext()
  return (
    <>
    

    <BrowserRouter>
    
        <div className="pages">
          
        <Routes>
            <Route
              path="/"
              element={user?<Dashboard />:<Navigate to="/login"/>}
            />
            <Route
              path="/login"
              element={!user ? <Login /> :<Navigate to="/"/> }
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> :<Navigate to="/"/> }
            />passwordreset
            <Route
              path="/passwordreset"
              element={!user ? <Passwordreset /> :<Navigate to="/"/> }
            />termsncond
            <Route
              path="/termsncond"
              element={!user ? <Termsandcontions /> :<Navigate to="/"/> }
            />


          </Routes>

        </div>


      </BrowserRouter>
    </>
  );
}

export default App;
