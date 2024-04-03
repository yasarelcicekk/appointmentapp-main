import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import logo from '../../img/kadyasbg.png'
import './navbar.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios"
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authActions";
import { Cookies, useCookies } from "react-cookie";


function useCheckUserSession() {

   const user = useSelector((state) => state.auth.user);

  const [loggedIn, setLoggedIn] = useState(!!user);
  
  useEffect(() => {
    if(user)
    {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false);
    }
    
  }, [user]);

  return loggedIn;
}



function ResponsiveAppBar() {
  const navigate = useNavigate();
  const loggedin = useCheckUserSession();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies([]);

  
const navItems = [
  { text: "Home", onclick: () => navigate("/") },
  { text: "About", onclick: () => navigate("/about") },
  { text: "Contact", onclick: () => navigate("/contact") },
];
loggedin &&
navItems.push(  { text: "Appointment", onclick: () => navigate("/appointment") })

const handleSignOut = () => {
  axios 
  .post('http://localhost:27017/signout')
  .then(response => {
    console.log(response)
    if (response.status===200) {
      console.log('Logout successful:');
       dispatch(logout());
       removeCookie("jwt")
      navigate("/")
    } else {
      // setError('Logout Failed');
      console.error('Logout failed:', response.data.message);
    }
  })
  .catch(error => {
  //   setError('Logout Failed');
    console.error('Error during logout:', error.response.data.message);
  })
}


const settings = [
  { text: "Profile", onclick: () => navigate("/profile") },
  { text: "My Appointments", onclick: () => navigate("/myappointments") },
  { text: "Logout",  onclick: () => handleSignOut()}
];

const handleSigninClick = () => {
  if (window.location.pathname !== "/signup") {
    navigate("/signin");
  }
}
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className='nav' position='sticky'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          {/*Logo Section*/}
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
          <Box  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>  {/*Menu Section*/}
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
                
                <MenuItem key={index} onClick={()=>{ navItem.onclick(); handleCloseNavMenu();}}>
                  <Typography textAlign="center"  >{navItem.text}</Typography>
                </MenuItem>
              ))}
             -
            </Menu>
          </Box>
           {/*Logo Section*/}
          <Box
            variant="h5"
            nowrap="true"
            component="a"
            onClick={()=>navigate("/")}
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
          </Box>
          <Box  sx={{ flexGrow: 1 , mr:0,display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
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
{/*Profile Section*/}
          {loggedin ? 
          <Box sx={{ flexGrow: 0  ,mr:{lg:3}}}>  
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'black' ,width: 45, height: 45 }} src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting,index) => (
                <MenuItem key={index}  onClick={()=>{setting.onclick(); handleCloseUserMenu();}}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> 
          :
          <Box sx={{ flexGrow: 0  ,mr:{lg:3}}}>
            <Button 
            onClick={handleSigninClick}
              sx={{ my: 2, color: 'white', display: 'block', padding:4 }}
            >
              Signup/Signin
            </Button>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;   



