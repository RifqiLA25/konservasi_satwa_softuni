import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    handleClose();
    navigate('/');
  };

  const menuItems = [
    {
      label: 'Beranda',
      icon: <HomeIcon fontSize="small" />,
      onClick: () => {
        handleClose();
        navigate('/');
      }
    },
    {
      label: 'Profil Saya',
      icon: <PersonIcon fontSize="small" />,
      onClick: () => {
        handleClose();
        navigate('/profile');
      }
    }
  ];

  if (user?.is_staff) {
    menuItems.push({
      label: 'Admin Panel',
      icon: <AdminPanelSettingsIcon fontSize="small" />,
      onClick: () => {
        handleClose();
        window.open('/admin', '_blank');
      }
    });
  }

  return (
    <AppBar position="static" sx={{ 
      backgroundColor: '#2E7D32',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              color: '#81C784'
            }
          }}
        >
          🦁 Konservasi Satwa
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          alignItems: 'center'
        }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/animals"
            sx={{ 
              '&:hover': { 
                backgroundColor: '#388E3C',
                color: '#E8F5E9'
              }
            }}
          >
            Satwa
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/news"
            sx={{ 
              '&:hover': { 
                backgroundColor: '#388E3C',
                color: '#E8F5E9'
              }
            }}
          >
            Berita
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/about"
            sx={{ 
              '&:hover': { 
                backgroundColor: '#388E3C',
                color: '#E8F5E9'
              }
            }}
          >
            Tentang
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/contact"
            sx={{ 
              '&:hover': { 
                backgroundColor: '#388E3C',
                color: '#E8F5E9'
              }
            }}
          >
            Kontak
          </Button>
          
          {user ? (
            <>
              <IconButton
                onClick={handleMenu}
                sx={{ 
                  ml: 2,
                  border: '2px solid #81C784',
                  padding: '4px'
                }}
              >
                {user.avatar ? (
                  <Avatar 
                    src={user.avatar} 
                    sx={{ 
                      width: 32, 
                      height: 32
                    }} 
                  />
                ) : (
                  <AccountCircleIcon sx={{ color: '#fff' }} />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    width: 200,
                    '& .MuiMenuItem-root': {
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      mx: 1,
                      my: 0.5
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle1" noWrap>
                    {user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user.email}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                
                {menuItems.map((item, index) => (
                  <MenuItem 
                    key={index}
                    onClick={item.onClick}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: '#E8F5E9'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </MenuItem>
                ))}
                
                <Divider sx={{ my: 1 }} />
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ 
                    color: '#D32F2F',
                    '&:hover': { 
                      backgroundColor: '#FFEBEE'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LogoutIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{ 
                  color: '#fff',
                  borderColor: '#fff',
                  '&:hover': { 
                    borderColor: '#81C784',
                    backgroundColor: 'rgba(129, 199, 132, 0.1)'
                  }
                }}
              >
                Login
              </Button>
              <Button 
                variant="contained"
                component={RouterLink}
                to="/register"
                sx={{ 
                  backgroundColor: '#81C784',
                  '&:hover': { 
                    backgroundColor: '#66BB6A'
                  }
                }}
              >
                Daftar
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
