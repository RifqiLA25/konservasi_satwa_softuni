import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PetsIcon from '@mui/icons-material/Pets';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KONSERVASI
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{ my: 2 }}
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/animals"
              color="inherit"
              sx={{ my: 2 }}
              className={location.pathname === '/animals' ? 'active' : ''}
            >
              Animals
            </Button>
            <Button
              component={Link}
              to="/news"
              color="inherit"
              sx={{ my: 2 }}
              className={location.pathname === '/news' ? 'active' : ''}
            >
              News
            </Button>
            <Button
              component={Link}
              to="/about"
              color="inherit"
              sx={{ my: 2 }}
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/contact"
              color="inherit"
              sx={{ my: 2 }}
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {isAuthenticated ? (
              <>
                <Typography sx={{ alignSelf: 'center', mr: 2 }}>
                  Welcome, {user.username}
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  startIcon={<PersonAddIcon />}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
