import React from 'react';
import { useSelector } from 'react-redux';
import './page.css'

import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(`userprofile ${user}`);
  return (
    <div className="profile-page">
      <div className="right-container clearfix">
        <h2>Information Profile</h2>
        <div className="input-group">
          <label>
            Full Name:
            <input className='profileInput' type="text" value={user.name} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            TC:
            <input className='profileInput' type="number" value={user.age} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Age:
            <input className='profileInput' type="number" value={user.age} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            E Mail:
            <input className='profileInput' type="email" value={user.email} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Phone Number:
            <input className='profileInput' type="number" value={user.age} readOnly />
          </label>
        </div>
        {/* Diğer bilgileri burada ekleyin */}
      </div>
      <div className="vertical-line"></div>
      <div className="left-container clearfix">
        <h2>My Appointments</h2>
        {/* <div className="input-group">
          <label>
            Date:
            <input className='profileInput' type="text" value="Date" readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Time:
            <input className='profileInput' type="text" value="Time" readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Doctor:
            <input className='profileInput' type="text" value="Doctor" readOnly />
          </label>
        </div> */}
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
              Date
            </Typography>
            <Typography className="card-text" variant="body2" component="p">
              Time
            </Typography>
            <Typography className="card-text" variant="body2" component="p">
              Doctor
            </Typography>
          </CardContent>
        </Card>
        {/* Buraya randevularınızı listelemek için gerekli içeriği ekleyin */}
      </div>
    </div>
  );
};

export default Profile;
