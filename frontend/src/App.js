import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './page/Home';
import About from './page/About';
import Contact from "./page/Contact";
import Signin from './page/Signin.js';
import Signup from "./page/Signup.js";
import Forgotpassword from "./page/Forgotpassword.js"
import Appointment from "./page/Appointment.js"
import Profile from "./page/UserProfile.js"
import store from "./redux/store.js"
import { Provider } from 'react-redux'
//home problem

function App() {
  return (
    <>
      <Provider store={store}>
      <Navbar /> 
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
      </Provider>
    </>
  );
};

export default App;
