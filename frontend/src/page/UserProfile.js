import React from 'react';
import { useSelector } from 'react-redux';
import './page.css'
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StethoscopeIcon from '@mui/icons-material/LocalHospital';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import axios from "axios"
import {API_URL} from "../config/api.config"
import { useState, useEffect } from 'react';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(`userprofile ${user.id}`);
  const [appointments, setAppointments] = useState("loading...")
  const userID = user.id;

  const data = { id: userID};

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/findUserAppointment/${userID}`, { withCredentials: true });
        setAppointments(response.data);
        if (appointments) {
          console.log('appointment list:', appointments);
        } else {
          console.error('appointment not listed:', appointments);
        }
      } catch (error) {
        console.error('Error during listing appointments:', error);
      }
    };

    fetchAppointments();
  }, [userID]);

  console.log("after req",appointments)

  return (
    <div className="profile-page">
      <div className="right-container clearfix">
        <h2>Information Profile</h2>
        <div className="input-group">
          <label >
            <BadgeOutlinedIcon  sx={{  color: 'black',backgroundColor: 'white',marginBottom: '-5px' }}/>  Full Name:
            <input className='profileInput' type="text" value={user.name} readOnly/>
          </label>
        </div>
        <div className="input-group">
          <label>
          <PinOutlinedIcon  sx={{  color: 'black',backgroundColor: 'white',marginBottom: '-5px' }}/>   TC:
            <input className='profileInput' type="number" value={user.age} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
          < PermContactCalendarOutlinedIcon sx={{  color: 'black',backgroundColor: 'white',marginBottom: '-5px' }}/>  Age:
            <input className='profileInput' type="number" value={user.age} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
          <EmailOutlinedIcon sx={{  color: 'black',backgroundColor: 'white',marginBottom: '-5px' }}/> E Mail:
            <input className='profileInput' type="email" value={user.email} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
          <ContactPhoneOutlinedIcon sx={{  color: 'black',backgroundColor: 'white',marginBottom: '-5px' }}/> Phone Number:
            <input className='profileInput' type="number" value={user.age} readOnly />
          </label>
        </div>
      </div>
      <div className="vertical-line"></div>
      <div className="left-container clearfix">
        <h2>My Appointments</h2>
        { appointments=="loading..." ? <h1>Appointments not loaded</h1> :
          appointments.map((appointment, index) => (
            <Card className="card-root"> 
            <div className="card-header">
              <Typography variant="h5" component="h2">
                My Appointment
              </Typography>
              <IconButton className="close-button">
                <CloseIcon />
              </IconButton>
            </div>
            <CardContent>
              <Typography className="card-text" variant="body2" component="p">
                <CalendarMonthIcon sx={{  color: 'black',backgroundColor: 'white',marginBottom: '-5px' }}/>
                {appointment.date.split(" ")[0]}
              </Typography>
              <Typography className="card-text" variant="body2" component="p">
                <QueryBuilderIcon sx={{ color: 'black',backgroundColor: 'white', marginBottom: '-5px' }}/>
                {appointment.date.split(" ")[1]}
              </Typography>
              <Typography className="card-text" variant="body2" component="p">
              <StethoscopeIcon sx={{color: 'black',backgroundColor: 'white', marginBottom: '-5px' }}/>
              {appointment.doctorName}
              </Typography>
            </CardContent>
          </Card>
          ))
        }
 
      </div>

      
    </div>
  );
};

export default Profile;
