import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import axios from "axios"
import { useState } from 'react';


const defaultTheme = createTheme();

export default function SignInSide() {

  const navigate=useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
   const data= {
    email:userData.get("email"),
    password: userData.get('password')
  };
  axios
      .post('http://localhost:27017/signin', data)
      .then(response => {
        var data = response.data;
        if (data.name) {
          console.log('Login successful:', data);
          navigate("/")
        } else {
          setError('Login Failed. Please check your email and password.');
          console.error('Login failed:', data.message);
        }
      })
      .catch(error => {
        setError('Login Failed. Please check your email and password.');
        console.error('Error during login:', error);
      });
  }
  


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.ankaraicmimarlik.com/uploads/642/642-4660.webp?v=v2022.10.13-002)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && (
       <Alert severity="error">{error}</Alert>)}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                size='small'
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size='small'
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouterLink to="/Date" variant="body2">
                    {"Appointment?"}
                  </RouterLink>
                </Grid>
                <Grid item xs>
                  <RouterLink to="/Forgotpassword" variant="body2">
                    {"Forgot password?"}
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/Signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </RouterLink>
                </Grid>
              </Grid>
              <SocialIcons />
              <hr />
              <Copyright />

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};


