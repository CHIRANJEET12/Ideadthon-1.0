// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/Landing';
import Footer from './components/Footer';
import './index.css';

const App = () => {
  return (
    <div>
      <Navbar />
        <LandingPage />
      <Footer />
    </div>
  );
};

export default App;