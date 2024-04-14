import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const defaultTheme = createTheme();

export default function ResetPassword() {
  const [matchAlert, setMatchAlert] = useState(null);
  const [passwordChangeAlert, setPasswordChangeAlert] = useState(null); 
  const [showPassword, setShowPassword] = useState(false);
  const [password1, setShowPassword1] = useState(null);
  const [password2, setShowPassword2] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

  useEffect(() => {

    if(password1 !== null && password2!==null)
    {
      if(password1==password2)
      {
        setMatchAlert("success")
      }
      else //password1 !== password2
      {
        setMatchAlert("error")
      }
    }
    else if (password1 == null && password2==null) //password1 == null password2==null
    {
       setMatchAlert(null)
    }
    console.log("matchalert",matchAlert)

    // if(password1 !== null && password2 !== null) { 
    //   if (password1 === password2 &&( password1 !==null || password2!==null)) {
    //     setMatchAlert("success");
    //   } 
    //   else if(password1 !== password2) 
    //   {
    //     setMatchAlert("error")
    //   }
    //   else {
    //     setMatchAlert(null)
    //   }
    // }
    // else{
    //   setMatchAlert(null)
    // }
   
  }, [password1, password2]);



  const handleSubmit = (event) => {
    event.preventDefault();
    if (matchAlert === "error") {
      setPasswordChangeAlert("failed to change password"); 
    } else if (matchAlert === "success"){ 
      setPasswordChangeAlert("password changed successfully"); 
      setNewPassword(password1);
      console.log('new password:', newPassword)
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
            <LockResetIcon  sx={{  width: 35, height: 35}}/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl variant="outlined" fullWidth margin="normal" required>
  <InputLabel htmlFor="password1">New Password</InputLabel>
  <OutlinedInput
    id="password1"
    value={password1}
    onChange={(e) => setShowPassword1(e.target.value)}    
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
    label="New Password"
  />
</FormControl>
      <FormControl variant="outlined" fullWidth margin="normal" required>
  <InputLabel htmlFor="password2">New Password</InputLabel>
  <OutlinedInput
    id="password2"
    value={password2}
    onChange={(e) => setShowPassword2(e.target.value)} 
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
    label="New Password"
  />
</FormControl>

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
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Grid container="true"></Grid>
          </Box>

        </Box>

     {/* {matchAlert ? <Alert severity={matchAlert}>{matchAlert =="success" ? "passwords matched" : matchAlert=="error" ? "passwords don't match" : null}</Alert> : null}    */}
 
              
     {/* {matchAlert===null ? null :  matchAlert == "success" ? "password matched" : "password not matching"} */}
     {matchAlert === null ? null : matchAlert === "success" ? "password matched" : matchAlert === "error" ? "password not matching" : null}
     {passwordChangeAlert ? <Alert severity={passwordChangeAlert}>
  <AlertTitle>Success</AlertTitle>
  This is a success Alert with an encouraging title.
</Alert> : null}   
        <SocialIcons />
        <hr />
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

