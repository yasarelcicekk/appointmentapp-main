import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LockOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import Alert from '@mui/material/Alert';
import MuiPhoneNumber from 'material-ui-phone-number';
import AlertTitle from '@mui/material/AlertTitle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useCookies } from "react-cookie";
import './page.css'

const defaultTheme = createTheme();

export default function SignUp() {

  const navigate=useNavigate();
  const [checked, handleAgreementChange] = useState(false);
  const [isValidMail, setValidMail] = useState(null)
  const [isValidPassword, setValidPassword] = useState(null)
  const [isValidPNumber, setValidPNumber] = useState(null)
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [cookies] = useCookies(["cookie-name"]);


  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

 
  const checkedHandler = (event) => {
    handleAgreementChange(event.target.checked);
    console.log(checked)
  }

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
    const data= {
     email:userData.get("email"),
     password: userData.get('password'),
     tc:userData.get("TC"),
     phoneNumber:userData.get("phonenumber")
   };
   console.log(data)
   console.log(data.phoneNumber.split(" ").join(""))
    if (checked===true) {
      if(validator.isEmail(data.email)) {
        setValidMail(false)
        if(validator.isStrongPassword(data.password)) {
          setValidPassword(false)
          if(validator.isMobilePhone(data.phoneNumber.split(" ").join(""))) {
            setValidPNumber(false)
            axios
            .post('http://localhost:27017/signup', data, { withCredentials: true })
            .then(response => {
              var data = response.data;
              if (data) {
                setSuccess("Signup process successful, you are redirected to the homepage.")
                console.log('signup process successful', data);
                setTimeout(() => {
                  navigate("/")
                }, 3000);
                
              } else {
                setError('signup process failed');
                console.error('signup process failed:', data.message);
              }
            })
            .catch(error => {
              setError('Signup process failed.\nPlease make sure you are not using an email or phone number that is already in use');
              setTimeout(() => {
                setError(null)
              }, 2000)
              console.error('Error during signup:', error); //mail veya phonemumber aynı olursa burda hata veriyor burayı ayarlayalım
            });
          console.log("form submitted");
          }
          else{
            setValidPNumber(true)
          }
        
        }
        else {
          setValidPassword(true)
        }
      }
      else{
        setValidMail(true)
      }
    } 
    else if(checked===false){
      setOpen(true); 
      
    }
    else{
      console.log("alert ver:şuanda talebinizi yerine getiremiyoruz lütfen daha sonra tekrar deneyiniz.")
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* {error && (
       <Alert severity="error">you have to agree kvkk</Alert>)} */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              helperText={isValidMail ? "Please enter a valid email": null}
              error={isValidMail}
            />
        
        <FormControl fullWidth size='small' variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            margin='normal'
            name='password'
            required
          
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
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
            helperText={isValidPassword ? "Please use a strong password (Capital letter, mark, number)" : null}
            error={isValidPassword}
            label="Password"
          />
        </FormControl>
            <MuiPhoneNumber
              margin="normal"
              required
              fullWidth
              id="phonenumber"
              label="Phone Number"
              name="phonenumber"
              autoComplete="tel"
              variant='outlined'
              size="small"
              regions={'europe'}
              defaultCountry="tr" 
              helperText={isValidPNumber ? "Please enter a valid phone number": null}
              error={isValidPNumber}
            />
  
            <Button onClick={handleDialogOpen}>KVKK Sözleşmesi</Button>
            <Dialog open={open} onClose={handleDialogClose}>
              <DialogTitle>KVKK Sözleşmesi</DialogTitle>
              <DialogContent dividers>
                <Typography variant="body1">
                  KVKK (Kişisel Verilerin Korunması Kanunu) sözleşmeleri genellikle kurumların kendi ihtiyaçları doğrultusunda hazırlanır. Bu sözleşmeler, kişisel verilerin işlenmesi, saklanması, kullanılması ve korunması gibi konuları kapsar. Örnek bir KVKK sözleşmesi genellikle aşağıdaki gibi temel bölümleri içerir:
                  Sözleşme Başlığı ve Tarafların Tanımlanması:
                  Bu kısım sözleşmenin adını, tarafları (genellikle bir işletme veya şirket ile kullanıcılar veya müşteriler arasında) ve tarafların iletişim bilgilerini belirtir.
                  Amaç:
                  Sözleşmenin amacı ve kapsamı bu bölümde açıklanır. Burada, kişisel verilerin nasıl işleneceği, hangi amaçlarla kullanılacağı ve hangi süreçlerin izleneceği gibi detaylar bulunur.
                  Kişisel Verilerin İşlenmesi:
                  Bu bölümde, hangi tür kişisel verilerin işleneceği, hangi amaçlarla toplandığı ve bu verilerin nasıl saklanacağı belirtilir. Ayrıca veri güvenliği ve gizliliği ile ilgili önlemler ve taahhütler de bu kısımda yer alır.
                  Veri Sahibinin Hakları:
                  Kişisel veri sahiplerinin hangi haklara sahip olduğu, bu hakları nasıl kullanabilecekleri ve hangi koşullarda bu haklardan faydalanabilecekleri açıklanır. Bu haklar genellikle düzeltme, silme, bilgi alma, veri taşınabilirliği gibi konuları içerir.
                  Veri Güvenliği:
                  Bu bölümde, kişisel verilerin güvenliğini sağlamak için alınan teknik ve organizasyonel önlemler belirtilir. Veri güvenliği prosedürleri, izin verilen kişilere erişim, veri kaybını önleme yöntemleri gibi detaylar burada yer alır.
                  İlgili Tarafların Yükümlülükleri:
                  Sözleşmeye taraf olan tarafların KVKK'ya uyum sağlama ve belirli yükümlülükleri yerine getirme konusunda taahhütlerini içerir.
                  Sözleşmenin Süresi ve Sonlanması:
                  Sözleşmenin başlangıç tarihi, süresi ve hangi koşullarda sonlanabileceği burada belirtilir.
                  Diğer Hususlar:
                  Kapsamlı KVKK sözleşmeleri, şirketin ihtiyaçlarına ve KVKK'ya uyum sağlama sürecine bağlı olarak ek bölümler de içerebilir. Bu, veri ihlali durumunda yapılacaklar, sözleşmenin revize edilmesi durumları gibi ek detaylar olabilir.
                  KVKK sözleşmeleri şirketlerin gereksinimlerine ve KVKK'nın belirlediği standartlara göre oldukça detaylı olabilir. Bu nedenle, örnek bir KVKK sözleşmesi hazırlanırken genellikle bir hukuk uzmanından veya danışmandan destek almak önemlidir.

                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={checked}
                      onChange={checkedHandler}
                    />
                  }
                  label="KVKK Sözleşmesini Okudum ve Onaylıyorum"
                />
                <Button onClick={handleDialogClose}>Kapat</Button>
              </DialogContent>
            </Dialog>
            {success && (<Alert severity="success">
  <AlertTitle>Your registration has been completed</AlertTitle>
  {success}
</Alert>)}
            {error && (
       <Alert severity="error">{error}</Alert>)}
            <Button
              // onClick={handleSubmit}
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
              Sign Up
            </Button>
            <Grid container="true">
              <Grid item="true" xs>

              </Grid>

            </Grid>

            <SocialIcons />
            <hr />
            <Copyright />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}





