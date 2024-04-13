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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import axios from "axios"
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { login } from "../redux/authActions";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import "./page.css"
import { useCookies } from "react-cookie";


const defaultTheme = createTheme();

export default function Signin() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cookies] = useCookies([]);


  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
   const data= {
    email:userData.get("email"),
    password: userData.get('password'),
    rememberMe: userData.get('remember') === 'remember' ? true : false
  };
axios
      .post('http://localhost:27017/signin', data, { withCredentials: true })
      .then(response => {
        let data = response.data;
        if (data.name) {
          console.log('Login successful:', data);
          dispatch(login({ user: data }));
          navigate("/profile")
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
      <Grid container = "true" component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item="true"
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.ankaraicmimarlik.com/uploads/642/642-4660.webp?v=v2022.10.13-002)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item="true" xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' , width: 60, height: 60 }}>
              <ExitToAppIcon  sx={{  width: 35, height: 35 }}/>
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
                 <FormControl fullWidth size='small' variant="outlined">  
<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            margin='normal'
            name='password'
            label="Password"
						 size='small'
						fullWidth
            required
           autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
           
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "gray" }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
              <FormControlLabel
                control={<Checkbox id='remember' name='remember' value="remember" color="primary" />}
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
              <Grid container = "true">
                <Grid className='linkBox' item="true" xs>
                  <RouterLink className='link' to="/Forgotpassword" variant="body2">
                    {"Forgot Password"}
                  </RouterLink>
                </Grid>
                <Grid className='linkBox' item="true" >
                  <RouterLink className='link' to="/Signup" variant="body2">
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


