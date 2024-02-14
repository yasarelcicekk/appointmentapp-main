import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './page/Home';
import About from './page/About';
import Contact from "./page/Contact";
import Appointment from './page/Appointment.js';
import Signup from "./page/Signup";
import Forgotpassword from "./page/Forgotpassword.js"
import Date from "./page/Date.js"


//home problem

function App() {
  return (
    <>
     
      <Navbar /> 
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="date" element={<Date />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
