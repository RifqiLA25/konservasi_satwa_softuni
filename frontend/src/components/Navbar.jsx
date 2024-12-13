import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ 
          flexGrow: 1, 
          textDecoration: 'none', 
          color: 'inherit' 
        }}>
          Konservasi Satwa
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/animals">
            Satwa
          </Button>
          <Button color="inherit" component={RouterLink} to="/news">
            Berita
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            Tentang
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Kontak
          </Button>
          
          {user ? (
            <>
              <Button 
                color="inherit" 
                onClick={logoutUser}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
