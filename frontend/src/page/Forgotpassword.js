
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';


const defaultTheme = createTheme();

export default function SignIn() {
  const [openAlert, setOpenAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPassword = data.get('password');

    if (!newPassword) {
      setOpenAlert(true); 
    } else {
      console.log('Yeni Şifre:', newPassword);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
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
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="New Password"
              name="password"
              autoComplete="current-password"
              autoFocus
              size="small"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
              Save
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>

        <Dialog open={openAlert} onClose={handleCloseAlert}>
          <DialogTitle>Uyarı</DialogTitle>
          <DialogContent>Lütfen yeni şifre girin.</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Kapat</Button>
          </DialogActions>
        </Dialog>
        <SocialIcons />
        <hr />
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

