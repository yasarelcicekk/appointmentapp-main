import React, { } from "react";
import Typography from '@mui/material/Typography';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import intimage from '../img/interior.jpg';
import waitimage from '../img/waitingarea.jpg';
import { Box } from '@mui/material';
import venimage from '../img/veneers.jpg';
import impimage from '../img/implant.jpg';
import smileimage from '../img/smile.jpg';
import './page.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
import axios from "axios"
import { useDispatch } from "react-redux";
import {getDoctorsRedux} from "../redux/doctorActions"


const Home = () => {

  const dispatch = useDispatch();

  axios.get('http://localhost:27017/findDoctor', {
    params: {
      ID:null
    }
  })
  .then(response => {
    let data = response.data;
    if(data){
        dispatch(getDoctorsRedux({doctors:data}))
        console.log("home",data)
    }
    else{
        console.error('get doctors procces failed:', data.message);
    }
  })
  .catch(function (error) {
    console.log(`doctors:${error}`);
  })
  .finally(function () {
    // always executed
  });

  return (
    <div>

      <Box className="homeBox" container spacing={3} item xs={12} sm={6} md={5} sx={{
        mr: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: "column", md: 'row', lg: 'row', xl: 'row', },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', sm: 'left', md: 'left' },
        ml: 3,
        mt: 5
      }}>

        <img className='boxImg' src={intimage} alt="Interior" style={{ marginRight: '20px', borderRadius: '10px', width: '48%' }} />

        <Typography
          className='boxText'
          align="right"
          style={{
            width: '48%',
            fontSize: '1.4vw',
            fontFamily: 'Gill Sans, sans-serif',
            textAlign: 'center',
          }}>
          <h1 className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em' }}>
            The Care, Attention And Service You Deserve</h1>
          At Hermes London Dental Clinic, we focus on providing clients with the best experience during each visit. We offer both routine and cosmetic dentistry in the heart of Central London near both Victoria and Pimlico. We have a friendly team of cosmetic dentists, dental hygienists and private orthodontists who provide treatments in a clean and comfortable environment. Our dentists and other experts put your needs first by putting you in full control of your oral hygiene by showing images and providing a detailed explanation of your dental needs. We provide treatments you fully understand with a very preventative approach to ensure your teeth and treatments last longer. Our dentists will explain your options and help you choose the treatment plan that best suits your condition. We also provide immediate treatment to patients who require an emergency dentist in London and facial aesthetic treatment such as Dermal Fillers.
        </Typography>
      </Box>

     
      <Box className="homeBox boxRev" container spacing={3} item xs={12} sm={6} md={5} sx={{
        mr: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: "column", md: 'row', lg: 'row', xl: 'row', },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', sm: 'left', md: 'left' },
        ml: 3,
        mt: 5
      }}>

       

        <Typography
          className='boxText'
          style={{
            width: '48%',
            fontSize: '1.4vw',
            fontFamily: 'Gill Sans, sans-serif',
            textAlign: 'center',
        
          }}>
          <h1 className='boxTextH1' style={{ fontFamily: 'Gill Sans, sans-serif', fontSize: '1.5vw', marginBottom: '0.5em' }}>
            The Care, Attention And Service You Deserve</h1>
          At Hermes London Dental Clinic, we focus on providing clients with the best experience during each visit. We offer both routine and cosmetic dentistry in the heart of Central London near both Victoria and Pimlico. We have a friendly team of cosmetic dentists, dental hygienists and private orthodontists who provide treatments in a clean and comfortable environment. Our dentists and other experts put your needs first by putting you in full control of your oral hygiene by showing images and providing a detailed explanation of your dental needs. We provide treatments you fully understand with a very preventative approach to ensure your teeth and treatments last longer. Our dentists will explain your options and help you choose the treatment plan that best suits your condition. We also provide immediate treatment to patients who require an emergency dentist in London and facial aesthetic treatment such as Dermal Fillers.
        </Typography>
         <img className='boxImg' src={waitimage} alt="Interior" style={{marginRight: '20px', borderRadius: '10px', width: '48%' }} />
      </Box>
      <br />
      <br />
      <br />
      <br />
      <Box >
        <Typography>
          <h1 style={{ textAlign: 'center', fontFamily: 'Gill Sans, sans-serif', fontSize: '2.5em', marginBottom: '0.5em', color: 'black' }}>How Our Team Can Help</h1>
        </Typography>
      </Box>
      <Box container
      className= 'homeCardBox'
       sx={{
        pt: 4,
        display: 'flex',
        flexDirection: {xs: 'column',   sm: 'row', md: 'row'},
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
              <Typography gutterBottom variant="h4" component="div" sx={{fontFamily: 'Gill Sans, sans-serif'}}>
                Straightening Crooked Teeth
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Gill Sans, sans-serif'}}>
                <h3> <DoneOutlineSharpIcon />  Clear braces with Invisalign.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental bonding to correct minor misalignment.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental veneers to correct misalignment, dark teeth and to alter the shape of teeth.</h3>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              src={impimage}
              sx={{
                width: '120%',
                height: '120%',
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{fontFamily: 'Gill Sans, sans-serif'}}>
                Replacing Missing Teeth
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Gill Sans, sans-serif'}}>
                <h3> <DoneOutlineSharpIcon />  Dental implants.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental bridges.</h3>
                <h3> <DoneOutlineSharpIcon /> Cosmetic dentures.</h3>
              </Typography>
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
              <Typography gutterBottom variant="h4" component="div" sx={{fontFamily: 'Gill Sans, sans-serif'}}>
                Brightening Your Smile
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Gill Sans, sans-serif'}}>
                <h3> <DoneOutlineSharpIcon />  Teeth whitening to whiten teeth.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental bonding or dental veneers to change the shape of teeth.Dental bridges.</h3>
                <h3> <DoneOutlineSharpIcon /> Dental bonding, veneers or orthodontics to rearrange crooked or misaligned teeth.</h3>
              </Typography>
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

