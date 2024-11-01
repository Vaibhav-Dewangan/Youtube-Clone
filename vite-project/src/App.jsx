import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import BottomNav from './Components/BottomNav';
import { AuthProvider } from './Context/UserAuth';
import SideNav from './Components/SideNav';
import './App.css';

function App() {
  const location = useLocation();
  const hideFooter = location.pathname.includes("/shortPlayer");

  return (
    <>
      <AuthProvider>

        <Header />
        <Outlet />
        <BottomNav />
        <SideNav />
        {!hideFooter && <Footer />}

      </AuthProvider>
    </>
  )
}

export default App;
