import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { FrontendRoute } from './enums/Routes';
import { SET_CURRENT_USER } from './redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/auth';
import { RootState } from './redux/store';
import { handleAuthState } from './services/auth';
import Redirect from './pages/Auth/components/Redirect';
import { login } from './services/auth';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const dispatch = useDispatch()

  const { email } = useSelector((store: RootState) => store.user)

  function handleLoggedInState() {
    setIsLoggedIn(true)
  }

  function handleLogoutState() {
    setIsLoggedIn(false)
  }

  async function handleLogin() {
    try {
      await login(dispatch, handleLoggedInState)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleAuthState(dispatch)
  })


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Redirect />} />
        <Route path={FrontendRoute.LOGIN} element={<Auth isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
        <Route path={FrontendRoute.DASHBOARD} element={<Dashboard handleLogoutState={handleLogoutState} email={email} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
