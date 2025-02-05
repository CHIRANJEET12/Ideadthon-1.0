// src/pages/LandingPage.jsx
import React from 'react';

const Landing = () => {
  return (
    <div className="text-center">
      <section className="bg-gray-100 py-20">
        <h2 className="text-4xl font-bold">Welcome to My Landing Page</h2>
        <p className="mt-4 text-lg">This is a simple landing page built with Vite, React, and Tailwind CSS.</p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Get Started</button>
      </section>

      <section className="py-20">
        <h3 className="text-3xl font-semibold">Features</h3>
        <div className="flex flex-wrap justify-center mt-10">
          <div className="max-w-xs mx-4 mb-6 p-6 bg-white rounded-lg shadow-lg">
            <h4 className="text-xl font-bold">Feature 1</h4>
            <p className="mt-2">Description of feature 1. It is really awesome!</p>
          </div>
          <div className="max-w-xs mx-4 mb-6 p-6 bg-white rounded-lg shadow-lg">
            <h4 className="text-xl font-bold">Feature 2</h4>
            <p className="mt-2">Description of feature 2. You will love it!</p>
          </div>
          <div className="max-w-xs mx-4 mb-6 p-6 bg-white rounded-lg shadow-lg">
            <h4 className="text-xl font-bold">Feature 3</h4>
            <p className="mt-2">Description of feature 3. It's a game changer!</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <h3 className="text-3xl font-semibold">Testimonials</h3>
        <div className="flex flex-wrap justify-center mt-10">
          <div className="max-w-xs mx-4 mb-6 p-6 bg-white rounded-lg shadow-lg">
            <p className="italic">"This is the best service I've ever used!"</p>
            <p className="mt-2 font-bold">- Happy Customer</p>
          </div>
          <div className="max-w-xs mx-4 mb-6 p-6 bg-white rounded-lg shadow-lg">
            <p className="italic">"Amazing experience, highly recommend!"</p>
            <p className="mt-2 font-bold">- Satisfied User</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <h3 className="text-3xl font-semibold">Join Us Today!</h3>
        <p className="mt-4">Sign up now to get started with our amazing features.</p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
      </section>
    </div>
  );
};

export default Landing;