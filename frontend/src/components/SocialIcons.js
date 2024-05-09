
import React from 'react';
import { Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // WhatsApp ikonu eklendi
import XIcon from '@mui/icons-material/X';

const SocialIcons = ({ whatsappNumber }) => {
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
      {/* WhatsApp */}
      <IconButton onClick={handleWhatsAppClick}>
        <WhatsAppIcon sx={{ color: 'black' }} />
      </IconButton>
      {/* Instagram */}
      <IconButton>
        <InstagramIcon sx={{ color: 'black' }} />
      </IconButton>
      {/* Twitter */}
      <IconButton>
        <XIcon sx={{ color: 'black', fontSize: 22 }} />
      </IconButton>
       {/* Facebook */}
       <IconButton>
        <FacebookIcon sx={{ color: 'black' }} />
      </IconButton>
    </Box>
  );
};

export default SocialIcons;
