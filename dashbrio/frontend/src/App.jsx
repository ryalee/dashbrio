import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase/supabaseClient';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: {user} }) => {
      setUser(user);
      setLoading(false);
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    })

    return () => listener.subscription.unsubscribe();
  }, [])

  if(loading) return <p className='text-center mt-10'>Carregando...</p>

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={!user ? <Login/> : <Navigate to="/dashboard" />}
        />

        <Route
          path='/signup'
          element={<SignUp/>}
        />

        <Route
          path='/dashboard'
          element={user ? <Dashboard/> : <Navigate to="/login" />}
        />

        <Route
          path='/'
          element={<Navigate to={user ? '/dashboard' : '/login'}/>}
        />
      </Routes>
    </Router>
  )
}