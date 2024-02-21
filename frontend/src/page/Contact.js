import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import SocialIcons from "../components/SocialIcons";
import Copyright from "../components/Copyright";
import Map from '../components/Map';
import './page.css'







const Contact = () => {

  const [selectedFirstname, setSelectedFirstname] = useState('');
  const [selectedLastname, setSelectedLastname] = useState('');
  const [selectedPhonenumber, setSelectedPhonenumber] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedYourmessage, setSelectedYourmessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleFirstnameChange = (event) => {
    setSelectedFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setSelectedLastname(event.target.value);
  };

  const handlePhonenumberChange = (event) => {
    setSelectedPhonenumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setSelectedEmail(event.target.value);
  };

  const handleYourmessageChange = (event) => {
    setSelectedYourmessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !selectedFirstname ||
      !selectedLastname ||
      !selectedPhonenumber ||
      !selectedEmail ||
      !selectedYourmessage
    ) {
      setOpenDialog(true);


      return;
    }

    console.log(`Selected Firstname: ${selectedFirstname}`);
    console.log(`Selected Lastname: ${selectedLastname}`);
    console.log(`Selected Phonenumber: ${selectedPhonenumber}`);

    // Additional logic for form submission can be added here

    // Clear form fields after submission
    setSelectedFirstname('');
    setSelectedLastname('');
    setSelectedPhonenumber('');
    setSelectedEmail('');
    setSelectedYourmessage('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (

    <div>
      <form onSubmit={handleSubmit}>
        <Box className='contactPageTextfield' sx={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: '10px',
          margin: '10px',

        }}>
          <Box
            className='contactPage'
            sx={{
              color: 'black',
              width: '40%',
              textAlign: 'center',
              flexDirection: 'column-reverse'
            }}>
            <Map />
          </Box>
          <Box sx={{
            color: 'black',
            width: '40%',
            textAlign: 'center',
            margin: 'auto',

          }}>
            <Typography>
              <h1 style={{ fontFamily: 'Gill Sans, sans-serif' }}> KADYAS DENTAL CLINIC</h1>
              <hr />
              <h3 style={{ fontFamily: 'Gill Sans, sans-serif' }}>Contact</h3>
            </Typography>


            <TextField
              margin="normal"
              required
              fullWidth
              id="FirstName"
              label="First Name"
              name="FirstName"
              autoComplete="text"
              autoFocus
              size="small"
              onChange={handleFirstnameChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="LastName"
              label="Last Name"
              name="LastName"
              autoComplete="text"
              size="small"
              onChange={handleLastnameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="PhoneNumber"
              label="Phone Number"
              name="PhoneNumber"
              autoComplete="number"
              size="small"
              onChange={handlePhonenumberChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              size="small"
              onChange={handleEmailChange}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="YourMessage"
              label="Your Message"
              name="YourMessage"
              autoComplete="YourMessage"
              size="large"
              onChange={handleYourmessageChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: 'black',
                color: 'white',
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <Box

          className='contactPageİnfo'
          sx={{
            textAlign: 'center',
            margin: '50px',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
            justifyContent: 'space-between',
            gap: '20px',
          }}>
            

            <div style={{ border: '1px solid lightblue', padding: '20px', borderRadius: '10px', flex: '1', }}>
              <h1 style={{ color: 'lightblue', fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5em', marginBottom: '0.5em' }}>
                Contact Us
              </h1>
              <h3 style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>
                Please call us on 0 (536) 894 35 38 or fill out the form and we will be happy to help. You can also send us an email. Please note we record calls to the practice for quality and training purposes.
              </h3>
            </div>

            <div style={{ border: '1px solid lightblue', padding: '20px', borderRadius: '10px', flex: '1' }}>
              <h1 style={{ color: 'lightblue', fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5em', marginBottom: '0.5em' }}>Our Location</h1>
              <h3 style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>The Dental Centre 139 Euston Road London NW1 2AA</h3>
            </div>

            <div style={{ border: '1px solid lightblue', padding: '20px', borderRadius: '10px', flex: '1' }}>
              <h1 style={{ color: 'lightblue', fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5em', marginBottom: '0.5em' }}>Opening Hours</h1>
              <h3 style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>The Dental Centre Monday to Friday 9:00am – 5:30pm</h3>
            </div>

            <div style={{ border: '1px solid lightblue', padding: '20px', borderRadius: '10px', flex: '1', fontFamily: 'Gill Sans, sans-serif' }}>
              <h1 style={{ color: 'lightblue', fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5em', marginBottom: '0.5em' }}>Email Us</h1>
              <h3 style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1em', marginBottom: '0.5em' }}>reception@thedentalcentre.com</h3>
            </div>
          </Box>
        </Box>
        <hr />
        <br />
        <br />


        <SocialIcons />
        <hr />
        <Copyright />
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter Information</DialogTitle>
        <DialogContent>
          <Typography>Please fill in all the details.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Contact;
