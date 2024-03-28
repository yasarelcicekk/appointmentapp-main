  
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import logo from '../../img/kadyasbg.png'
import './navbar.css'
import Link from "@mui/material/Link";




function ResponsiveAppBar() {

  const navigate = useNavigate();
const navItems = [
  { text: "Home", onclick: () => navigate("/") },
  { text: "About", onclick: () => navigate("/about") },
  { text: "Contact", onclick: () => navigate("/contact") },
  { text: "Appointment", onclick: () => navigate("/appointment") },
  { text: "Sıgn Up / Sıgn In ", onclick: () => navigate("/sıgnup / sıgnın ") },

];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar className='nav' position='sticky'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
         
          <Box
          onClick={()=>navigate("/")}
            variant="h6"
            nowrap="true"
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              ml:3,
            }}
          >
     <img alt='logo' className='kyLogo' src={logo}/>
          </Box>
          <Box  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'}
              }}
            >
          
              {navItems.map((navItem, index) => (
                
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={navItem.onclick} >{navItem.text}</Typography>
                </MenuItem>
              ))}
             -
            </Menu>
          </Box>
          
          <Link
            variant="h5"
            nowrap="true"
            component="a"
            href="/"
            sx={{
              mr:{ lg:2},
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt='logo' className='kyLogo' src={logo}/>
          </Link >
          <Box  sx={{ flexGrow: 1 , mr:5,display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {navItems.map((navItem, index) => (
              <Button 
              className='navButton'
                key={index}
                onClick={navItem.onclick}
                sx={{ my: 2, color: 'white', display: 'block', padding:4 }}
              >
                {navItem.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar; 