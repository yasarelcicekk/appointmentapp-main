import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright(props) {

  const currentYear = new Date().getFullYear();

    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          KADYAS
        </Link>{' '}
        {currentYear}
        {'.'}
      </Typography>
    );
  }


  export default Copyright;