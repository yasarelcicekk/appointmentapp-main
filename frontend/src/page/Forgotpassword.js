import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import validator from "validator";
import axios from "axios"
import {API_URL} from "../../../backend/config/api.config"

const defaultTheme = createTheme();

export default function SignIn() {
  const [openAlert, setOpenAlert] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userMail = new FormData(event.currentTarget);
    const data = {
      email: userMail.get("email"),
    };
    if (!data.email || !validator.isEmail(data.email)) {
      setOpenAlert("error"); 
      return;
    } 

      setOpenAlert("success");


  try {
    const response = await axios.post(`${API_URL}/forgotPassword`, data, { withCredentials: true });
    let responseData = response.data;
    if (!responseData) {
      console.error('Login failed:', responseData);
      // Show error to user
    }
  } catch (error) {
    console.error('Error during posting email:', error);
    // Show error to user
  }
    
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black', width: 60, height: 60  }}>
            <EmailIcon  sx={{  width: 35, height: 35}}/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Email
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email"
              name="email"
              autoComplete="current-email"
              autoFocus
              size="small"
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
              Send
            </Button>
            <Grid container="true"></Grid>
          </Box>
        </Box>

{openAlert ? <Alert variant="filled" severity={openAlert}> {openAlert == "success" ? "Email sent successfully" : "Please enter a valid email"} </Alert> : null}
        <SocialIcons />
        <hr />
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

