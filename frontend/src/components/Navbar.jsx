// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">My Landing Page</h1>
        <div>
          <button className="text-white px-4 py-2 mr-2 bg-blue-800 rounded">Login</button>
          <button className="text-white px-4 py-2 bg-blue-800 rounded">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;