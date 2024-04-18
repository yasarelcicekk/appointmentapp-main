import React, { } from "react";
import Typography from '@mui/material/Typography';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import intimage from '../img/h1.jpeg';
import waitimage from '../img/h2.jpeg';
import { Box } from '@mui/material';
import venimage from '../img/h5.jpeg';
import impimage from '../img/h4.jpeg';
import smileimage from '../img/h3.jpeg';
import implant from '../img/h6.jpeg';
import kaplama from '../img/h7.jpeg';
import imlantimage from '../img/h8.jpeg';
import './page.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { getDoctorsRedux } from "../redux/doctorActions"
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import { useState, useEffect, useRef, useMemo } from "react";
import { Cookies, useCookies } from "react-cookie";
import { login, logout } from "../redux/authActions";
import { useNavigate } from "react-router-dom";

const Home = () => {


  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [doctorDataFetched, setDoctorDataFetched] = useState(false);


  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt && cookies.jwt !== undefined) {
        axios
          .post('http://localhost:27017', {}, { withCredentials: true })
          .then(response => {
            let data = response.data
            if (data.status === true) {
              dispatch(login({ user: data.user }))
              console.log("status true user loggedin")
              setOpen(false)
            } else {
              dispatch(logout())
              removeCookie("jwt")
              console.log("status false user not loggedin")
              setOpen(true)
            }
          })
      } else {
        dispatch(logout())
        setOpen(true)
      }

    };
    verifyUser();
  }, [cookies, dispatch, navigate, removeCookie]);

  const doctors = useSelector(state => state.doctors) || ["loading"];

  console.log("doctors", doctors)

  useEffect(() => {
    if (!doctorDataFetched) {
      axios.get('http://localhost:27017/findDoctor')
        .then(response => {
          let data = response.data;
          if (data) {
            dispatch(getDoctorsRedux({ doctors: data }))
            console.log("home", data)
            setDoctorDataFetched(true); // İsteğin yapıldığını işaretle
          } else {
            console.error('get doctors process failed:', data.message);
          }
        })
        .catch(function (error) {
          console.log(`doctors: ${error}`);
        });
    }
  }, [doctorDataFetched, dispatch]);


  return (
    <div>
      <Collapse in={open}>
        <Alert className="homeAlert" icon={false} action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
          You can make an appointment on our website by registering and logging in now
        </Alert>
      </Collapse>

      <Box className="homeBox" container="true" spacing={3} item="true" xs={12} sm={6} md={5} sx={{
        mr: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: "column", md: 'row', lg: 'row', xl: 'row', },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', sm: 'left', md: 'left'},
        ml: 3,
        mt: 5
      }}>

        <img className='boxImg' src={intimage} alt="Interior" style={{marginLeft: '50px', borderRadius: '10px', width: '40%', height: '40%' }} />

        <Box
          className='boxText'
          align="right"
          style={{
            width: '48%',
            fontSize: '1.4vw',
            fontFamily: 'Gill Sans, sans-serif',
            textAlign: 'center',
            lineHeight: "1.5",
            letterSpacing: "0.00938em"
          }}>
          <Typography variant="h1" className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em', fontWeight: "bold"  }}>
            The Care, Attention, and Service You Deserve at KADYAS Dental Clinic
          </Typography>
          At KADYAS Dental Clinic, we are committed to providing our clients with an exceptional experience during each visit. We offer a comprehensive range of both routine and cosmetic dentistry services. Our friendly team consists of skilled cosmetic dentists, dental hygienists, and private orthodontists, all dedicated to delivering top-notch treatments in a clean and comfortable environment.
          <Typography variant="h1" className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em', fontWeight: "bold" }}>
          Putting Your Needs First – A Personalized Approach to Your Oral Health
          </Typography>
          Our priority is your oral health and satisfaction. Our dentists and experts always put you in full control of your oral hygiene by providing clear visual images and detailed explanations of your dental needs. We take a preventative approach to ensure the longevity of your teeth and treatments.
          <Typography variant="h1" className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em', fontWeight: "bold" }}>
            UUnderstanding Your Treatment Options – Transparent and Comprehensive Care
          </Typography>
          We believe in transparency and will thoroughly explain all your treatment options. Our team will assist you in choosing the best treatment plan tailored to your individual condition.
          <Typography variant="h1" className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em', fontWeight: "bold" }}>
          Emergency Dental Services – Immediate Care When You Need It Most
          </Typography>
          In addition to routine and cosmetic dentistry, we also offer immediate emergency dental services for patients requiring urgent care, including fillers and other treatments.
        </Box>
      </Box>


      <Box className="homeBox boxRev" container="true" spacing={3} item="true" xs={12} sm={6} md={5} sx={{
        mr: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: "column", md: 'row', lg: 'row', xl: 'row', },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', sm: 'left', md: 'left' },
        ml: 3,
        mt: 5
      }}>



        <Box
          className='boxText'
          style={{
            width: '48%',
            fontSize: '1.4vw',
            fontFamily: 'Gill Sans, sans-serif',
            textAlign: 'center',
            lineHeight: "1.5",
            letterSpacing: "0.00938em"
          }}>
          <Typography variant="h1" className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em', fontWeight: "bold" }}>
            The Care, Attention, and Service You Deserve at KADYAS Dental Clinic
          </Typography>
          At KADYAS Dental Clinic, we are committed to providing our clients with an exceptional experience during each visit. We offer a comprehensive range of both routine and cosmetic dentistry services. Our friendly team consists of skilled cosmetic dentists, dental hygienists, and private orthodontists, all dedicated to delivering top-notch treatments in a clean and comfortable environment.
          <Typography variant="h1" className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em', fontWeight: "bold" }}>
            Putting Your Needs First
          </Typography>
          Our priority is your oral health and satisfaction. Our dentists and experts always put you in full control of your oral hygiene by providing clear visual images and detailed explanations of your dental needs. We take a preventative approach to ensure the longevity of your teeth and treatments.
          <Typography variant="h1" className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em', fontWeight: "bold" }}>
            Understanding Your Treatment Options
          </Typography>
          We believe in transparency and will thoroughly explain all your treatment options. Our team will assist you in choosing the best treatment plan tailored to your individual condition.
          <Typography variant="h1" className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em', fontWeight: "bold" }}>
            Emergency Dental Services
          </Typography>
          In addition to routine and cosmetic dentistry, we also offer immediate emergency dental services for patients requiring urgent care, including fillers and other treatments.
        </Box>
        <img className='boxImg' src={waitimage} alt="Interior" style={{ marginRight: '50px', borderRadius: '10px', width: '40%', height: '30%' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gallery" style={{ display: 'flex', width: '100%' }}>
          <div style={{ flex: 1 }}>
            <img src={implant} style={{ width: '100%', height: '100%' }} alt="" />
          </div>
          <div style={{ flex: 1 }}>
            <img src={kaplama} style={{ width: '100%', height: '100%' }} alt="" />
          </div>
          <div style={{ flex: 1 }}>
            <img src={imlantimage} style={{ width: '100%', height: '100%' }} alt="" />
          </div>
        </div>
      </Box>
      <Box >
        <Box>
          <Typography variant="h1" style={{ textAlign: 'center', fontFamily: 'Gill Sans, sans-serif', fontSize: '2.5em', marginBottom: '0.5em', color: 'black', fontWeight: "bold" }}>How Our Team Can Help</Typography>
        </Box>
      </Box>
      <Box container="true"
        className='homeCardBox'
        sx={{
          pt: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row', md: 'row' },
          gap: 4,
          borderRadius: '10%',
          padding: '5%'
        }}>
        <Card >
          <CardActionArea>
            <CardMedia
              component='img'
              src={venimage}
              sx={{
                width: '101%',
                height: '101%',


              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: 'Gill Sans, sans-serif' }}>
                Straightening Crooked Teeth
              </Typography>
              <div className="homeText" sx={{ fontFamily: 'Gill Sans, sans-serif' }}>
                <h3> <DoneOutlineSharpIcon />  Clear braces with Invisalign.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental bonding to correct minor misalignment.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental veneers to correct misalignment, dark teeth and to alter the shape of teeth.</h3>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              src={impimage}
              sx={{
                width: '101%',
                height: '101%',
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: 'Gill Sans, sans-serif' }}>
                Replacing Missing Teeth
              </Typography>
              <div className="homeText" sx={{ fontFamily: 'Gill Sans, sans-serif' }}>
                <h3> <DoneOutlineSharpIcon />  Dental implants.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental bridges.</h3>
                <h3> <DoneOutlineSharpIcon /> Cosmetic dentures.</h3>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card >
          <CardActionArea>
            <CardMedia
              component='img'
              src={smileimage}
              sx={{
                width: '100%',
                height: '100%',
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: 'Gill Sans, sans-serif' }}>
                Brightening Your Smile
              </Typography>
              <div className="homeText" sx={{ fontFamily: 'Gill Sans, sans-serif' }}>
                <h3> <DoneOutlineSharpIcon />  Teeth whitening to whiten teeth.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental bonding or dental veneers to change the shape of teeth.Dental bridges.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental bonding, veneers or orthodontics to rearrange crooked or misaligned teeth.</h3>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      <SocialIcons />
      <hr />
      <Copyright />

    </div>
  );
};
export default Home;

