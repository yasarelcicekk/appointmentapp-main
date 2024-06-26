import { } from '@mui/icons-material';
import React from 'react'
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/material';
import './page.css';
import { useSelector } from 'react-redux';

const About = () => {

  const doctors = useSelector((state) => state.doctors.doctors);

  return (
    <div>

      <div>
        <h2 className='brandStyle' >ABOUT US DENTAL CENTER</h2>
        <h1 className='headingStyle' > Proudly supported by an experienced and highly skilled team of dentists in Dental Center. All our experiences combined offer you access to specialist dental care in a modern and comfortable treatment centre. Trust Dental Center for a hard working dental team ready to welcome you in a warm and friendly environment!</h1>
        <h2  className='brandStyle'>Our Dental Team</h2>
      </div>
      <Box container
        className='aboutCardBox'
        sx={{
          pt: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row', md: 'row' },
          gap: 4,
          borderRadius: '10%'
        }}>
        {doctors.map(function (doctor) {
          return (
            <Card>
              <CardActionArea>
                <CardMedia className='aboutCard'
                  component='img'
                  src={`data:image/jpg;base64,${doctor.doctorImage}`}
                  sx={{
                    borderRadius: "20px",
                    width: '90%',
                    height: '50%',
                    margin: 'auto',
                    display: 'block',
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {doctor.doctorName + " " + doctor.doctorLastname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <h2> {doctor.doctorSpecialty}</h2>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <h3> Languages spoken</h3>
                    <h5> {doctor.doctorLanguages} </h5>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>)
        })}
      </Box>
      <SocialIcons />
      <hr />
      <Copyright />
    </div>
  );
};

export default About;
