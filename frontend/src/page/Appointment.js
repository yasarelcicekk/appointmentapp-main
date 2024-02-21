import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import { useSelector } from 'react-redux';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Appointment = () => {

  const navigate=useNavigate();

  const doctors = useSelector((state) => state.doctors.doctors);

  const [error, setError] = useState(null);

  
  const [success, setSuccess] = useState(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleAppointmentSubmit = (event) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime || !selectedDoctor) {
      setOpenDialog(true);
      return;
    }

    console.log(`Selected Date: ${selectedDate}`);
    console.log(`Selected Time: ${selectedTime}`);
    console.log(`Selected Doctor: ${selectedDoctor}`);

    const data= {
     date:selectedDate+selectedTime,
     doctorName:selectedDoctor
   };
   axios
   .post('http://localhost:27017/addAppointment', data)
   .then(response => {
     var data = response.data;
     if (data) {
      setSuccess("Appointment process successful, you are redirected to the My Appointments page.")
       console.log('Appointment process successful', data);
       setTimeout(() => {
         navigate("/profile")
       }, 3000);
       
     } else {
      setError('Appointment process failed');
      console.error('Appointment process failed:', data.message);
     }
   })
   .catch(error => {
    setError('Appointment process failed.');
    setTimeout(() => {
      setError(null)
    }, 2000)
     console.error('Error during appointment:', error); //mail veya phonemumber aynı olursa burda hata veriyor burayı ayarlayalım
   });

  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Appointment
      </Typography>
      <form onSubmit={handleAppointmentSubmit}>
        <TextField
          id="date"
          label="Tarih"
          type="date"
          required
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="time"
          label="Saat"
          type="time"
          required
          value={selectedTime}
          onChange={handleTimeChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="doctor-label">Doktor</InputLabel>
          <Select
          required
            labelId="doctor-label"
            id="doctor"
            value={selectedDoctor}
            label="Doktor"
            onChange={handleDoctorChange}
          >
            {doctors.map((doctor, index) => (
              <MenuItem key={index} value={doctor.doctorName + " " + doctor.doctorLastname}>
                {doctor.doctorName + " " + doctor.doctorLastname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {success && (<Alert severity="success">
  <AlertTitle>Your registration has been completed</AlertTitle>
  {success}
</Alert>)}
            {error && (
       <Alert severity="error">{error}</Alert>)}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleAppointmentSubmit}
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: 'black', 
            color: 'white',
          }}
        >
          Appointment
        </Button>
      </form>
      <SocialIcons />
      <hr style={{ width: '100%' }} />
      <Copyright />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Bilgileri girin</DialogTitle>
        <DialogContent>
          <Typography>Lütfen tüm bilgileri giriniz.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Appointment;
