import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.1 }
      );
  
      const hiddenElements = document.querySelectorAll('.fade-in-section');
      hiddenElements.forEach((el) => observer.observe(el));
  
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'bgZoom 20s ease-out forwards',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              animation: 'fadeIn 3s ease-out'
            }
          }}
        />

        {/* Content */}
        <Container sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography 
              variant="h1" 
              sx={{ 
                fontFamily: 'Montserrat, sans-serif',
                color: 'white',
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                animation: 'zoomFadeIn 3s ease-out',
                letterSpacing: '2px',
                lineHeight: 1.2
              }}
            >
              Vietnamese Culinary<br/>
              Excellence
            </Typography>
            
            <Typography 
              variant="h5"
              sx={{ 
                fontFamily: 'Montserrat, sans-serif',
                color: 'white',
                mb: 4,
                maxWidth: '600px',
                lineHeight: 1.8,
                animation: 'fadeIn 2s ease-out 1s backwards',
                fontWeight: 500,
                letterSpacing: '1px',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Where traditional flavors meet modern elegance in a luxurious dining experience
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/menu')}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                animation: 'fadeIn 2s ease-out 1.5s backwards',
                '&:hover': {
                  backgroundColor: '#fff',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              EXPLORE MENU
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 15, backgroundColor: '#fff' }}>
        <Container>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} className="fade-in-section">
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=2067&auto=format&fit=crop"
                sx={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  boxShadow: '40px 40px 0px 0px rgba(0,0,0,0.05)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className="fade-in-section">
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#CC0000',
                  mb: 2,
                  letterSpacing: '3px',
                  fontWeight: 600,
                  fontSize: '2rem'
                }}
              >
                ABOUT US
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  mb: 4,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Traditional Flavors
              </Typography>
              <Typography 
                sx={{ 
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                FairyDragon proudly brings authentic Vietnamese culinary experiences in an elegant and sophisticated setting. Each of our dishes is a perfect blend of traditional recipes and modern presentation.
              </Typography>
              <Typography 
                sx={{ 
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                Our talented team of chefs meticulously selects the finest ingredients, ensuring each dish is not only delicious but also a visual masterpiece.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8, bgcolor: '#f8f8f8' }}>
        <Container>
          <Grid container spacing={4} justifyContent="center" className="fade-in-section">
            <Grid item xs={12} textAlign="center">
              <Typography 
                variant="h4" 
                sx={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  mb: 4, 
                  color: '#CC0000',
                  fontSize: '3rem',
                  fontWeight: 600
                }}
              >
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ color: '#CC0000' }} />
                  <Typography>028.1234.5678</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ color: '#CC0000' }} />
                  <Typography>info@fairydragon.com</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton sx={{ color: '#CC0000' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: '#CC0000' }}>
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <style>{`
        @keyframes riceWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }

        @keyframes floatingHat {
          0%, 100% { transform: rotate(-35deg) translate(0, 0); }
          50% { transform: rotate(-35deg) translate(0, -20px); }
        }

        @keyframes bgZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        @keyframes zoomFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(50px);
          visibility: hidden;
          transition: opacity 0.6s ease-out, transform 1.2s ease-out;
          will-change: opacity, visibility;
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: none;
          visibility: visible;
        }
      `}</style>
    </Box>
  );
};

export default Home;