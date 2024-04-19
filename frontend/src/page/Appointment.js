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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';



const Appointment = () => {
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors);
  const user = useSelector((state) => state.auth.user);


  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  }
  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleAppointmentSubmit = (event) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime || !selectedDoctor) {
      setOpenDialog(true);
      return;
    }
    const formattedDate = dayjs(selectedDate).format('DD-MM-YYYY');
    const formattedTime = dayjs(selectedTime).format('HH:mm');
    console.log("auth user appointment 63:", user)
    console.log("user.id appointment 64", user.id)
    const data = {
      date: formattedDate + " " + formattedTime,
      doctorName: selectedDoctor.split(' ')[0],
      userID: user.id
    };
    console.log("Appointment", data)
    axios
      .post('http://localhost:27017/addAppointment', data, { withCredentials: true })
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
        console.error('Error during appointment:', error);
      });

  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const today = new Date().toISOString().split('T')[0];



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
          label="Date"
          type="date"
          required
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
          inputProps={{
            min: today,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker
              value={selectedTime}
              ampm={false}
              minTime={dayjs().set('hour', 9).startOf('hour')}
              skipDisabled={true}
              maxTime={dayjs().set('hour', 17).set('minute', 0)}
              timeSteps={{ minutes: 30 }}
              onChange={handleTimeChange}
              label="Time"
              views={['hours', 'minutes']}
              fullWidth
              margin="normal"
              padding="0"
              InputLabelProps={{
                shrink: true,
              }}
              required
              sx={{ width: '100%' }}


            />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl fullWidth margin="normal">
          <InputLabel id="doctor-label">Doctor</InputLabel>
          <Select
            required
            labelId="doctor-label"
            id="doctor"
            value={selectedDoctor}
            label="Doctor"
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
