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

const doctors = ['Dr. Sanjay Gupta', 'Dr. Paul Nassif', 'Dr. Robert Rey', 'Dr. Phil McGraw'];

const AppointmentForm = () => {
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleDateChange = (event) => {
    setSelectedAppointmentDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleAppointmentSubmit = (event) => {
    event.preventDefault();

    if (!selectedAppointmentDate || !selectedTime || !selectedDoctor) {
      setOpenDialog(true);
      return;
    }

    console.log(`Selected Date: ${selectedAppointmentDate}`);
    console.log(`Selected Time: ${selectedTime}`);
    console.log(`Selected Doctor: ${selectedDoctor}`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const today = new Date();

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
          value={selectedAppointmentDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
          inputProps={{ min: today.toISOString().split('T')[0] }}
        />
        <TextField
          id="time"
          label="Time"
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="doctor-label">Doctor</InputLabel>
          <Select
            labelId="doctor-label"
            id="doctor"
            value={selectedDoctor}
            label="Doctor"
            onChange={handleDoctorChange}
          >
            {doctors.map((doctor, index) => (
              <MenuItem key={index} value={doctor}>
                {doctor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default AppointmentForm;
