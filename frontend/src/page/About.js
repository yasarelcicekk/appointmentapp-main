import { } from '@mui/icons-material';
import React from 'react'
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
import { Box } from '@mui/material';
import avatarimg from '../img/avatar.jpg';
import './page.css'


const About = () => {
  const brandStyle = {
    color: 'lightblue',
    fontSize: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '120px',
    Padding: '20px',
    textAlign: 'center'
  };
  const headingStyle = {
    color: 'black',
    fontSize: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    Padding: '50px',
    paddingRight: "10px",
    paddingLeft: "10px",
    margin: 'auto',
    textAlign: 'center'
  };



  return (
    <div>

      <div>
        <h2 style={brandStyle}>ABOUT US DENTAL CENTER</h2>
        <h1 style={headingStyle}> Proudly supported by an experienced and highly skilled team of dentists in Dental Center. All our experiences combined offer you access to specialist dental care in a modern and comfortable treatment centre. Trust Dental Center for a hard working dental team ready to welcome you in a warm and friendly environment!</h1>
        <h2 style={brandStyle}>Our Dental Team</h2>
      </div>
      <Box container
       className= 'aboutCardBox'
       sx={{
        pt: 4,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row', md: 'row' },
        gap: 4,
        borderRadius: '10%'
      }}>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              src={avatarimg}
              sx={{
                width: '50%', // Dilediğiniz genişliği buradan ayarlayabilirsiniz
                height: '50%',
                margin: 'auto',
                display: 'block'

              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Dr. Sanjay Gupta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h3> Languages spoken</h3>
                <h3> <DoneOutlineSharpIcon /> English </h3>
                <h3> <DoneOutlineSharpIcon /> French</h3>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              src={avatarimg}
              sx={{
                width: '50%', 
                height: '50%',
                margin: 'auto',
                display: 'block'

              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Dr. Phil McGraw
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h3> Languages spoken</h3>
                <h3> <DoneOutlineSharpIcon /> English</h3>
                <h3> <DoneOutlineSharpIcon /> Spanish</h3>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              src={avatarimg}
              sx={{
                width: '50%', // Dilediğiniz genişliği buradan ayarlayabilirsiniz
                height: '50%',
                margin: 'auto',
                display: 'block'
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Dr. Paul Nassif
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h3> Languages spoken</h3>
                <h3> <DoneOutlineSharpIcon /> English </h3>
                <h3> <DoneOutlineSharpIcon /> Turkish </h3>

              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              src={avatarimg}
              sx={{
                width: '50%',
                height: '50%',
                margin: 'auto',
                display: 'block'
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Dr. Robert Rey
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h3> Languages spoken</h3>
                <h3> <DoneOutlineSharpIcon />English</h3>
                <h3> <DoneOutlineSharpIcon /> Greek</h3>

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

export default About;
