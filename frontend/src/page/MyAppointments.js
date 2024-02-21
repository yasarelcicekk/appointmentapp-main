
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SocialIcons from '../components/SocialIcons';
import Copyright from '../components/Copyright';

const AppointmentsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" 
      sx={{ 
        marginTop: '5%', 
        fontFamily: 'Gill Sans, sans-serif', 
        marginBottom: '10px' 
        }}>
        My Appointments
      </Typography>
     
      <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Button variant="contained" color="primary" 
          sx={{ 
            mt: 3,
            mb: 2,
            backgroundColor: 'black',
            color: 'white',
            marginRight: '5px',
            marginBottom: '20%' 
            }}>
            My Appointments
          </Button>
          <Button variant="contained" color="secondary" 
          sx={{ 
            mt: 3,
            mb: 2,
            backgroundColor: 'black',
            color: 'white',
            marginRight: '5px',
            marginBottom: '20%' 
            }}>
            My Past Appointments
          </Button>
        </CardContent>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>



      </Card>
      <SocialIcons />
      <hr />
      <Copyright />
    </div>
  );
};

export default AppointmentsPage;

