import React from 'react';
import { Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const SocialIcons = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
      {/* Facebook */}
      <IconButton>  

        
        <FacebookIcon sx={{ color: 'black' }} />
      </IconButton>
      {/* Instagram */}
      <IconButton>
        <InstagramIcon sx={{ color: 'black' }} />
      </IconButton>
      {/* Twitter */}
      <IconButton>
        <TwitterIcon sx={{ color: 'black' }} />
      </IconButton>
    </Box>
  );
};

export default SocialIcons;
