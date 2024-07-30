import React from "react";
import {Link, Navigate, NavLink, useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";
import { styled,useTheme, useThemeProps } from '@mui/material/styles';
import { ThemeContext } from "@emotion/react";


const HomeLink = styled(Link)({
  textDecoration: 'none',
  marginLeft: '16px',
  color: 'white'
});


function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    onLogout();
    navigate("/auth");
  }

  // // sx={{ backgroundColor: '#D32F2F' }}

  return (
    <div>
  <AppBar position="static" >
        <Toolbar>
          <IconButton
            edge="start"
            size="large"
            color="#D32F2F"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            <Link to="/" style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>Home</Link>
          </Typography>
          <Typography variant="h6">
            {!isAuthenticated ? (
              <Link to="/auth" style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>Login/Register</Link>
            ) : (
              <div>
                <IconButton onClick={handleLogout}><LockOpen /></IconButton>
                <Link to="/profile" style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>Profil</Link>
             
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;