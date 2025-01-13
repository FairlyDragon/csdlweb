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
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Header />
      
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              border: '2px solid rgba(204, 0, 0, 0.1)',
              borderRadius: '50%',
              animation: `float${i} ${10 + i * 2}s infinite ease-in-out`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background with parallax effect */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            right: '-10%',
            bottom: '-20%',
            backgroundImage: `url('https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=2067&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'bgZoom 20s ease-out forwards',
            transform: 'scale(1.2)',
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

        {/* Add subtle moving shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            zIndex: 1
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: '40vw',
                height: '40vw',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                animation: `rotate ${20 + i * 5}s infinite linear`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </Box>

        {/* Hero Content */}
        <Container sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography 
              variant="h1" 
              color="white"
              sx={{ 
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
              color="white"
              sx={{ 
                mb: 4,
                maxWidth: '600px',
                lineHeight: 1.8,
                animation: 'fadeIn 2s ease-out 1s backwards',
                fontWeight: 300,
                letterSpacing: '1px'
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
      <Box 
        sx={{ 
          py: 15,
          backgroundColor: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative circle */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(204,0,0,0.05) 0%, rgba(204,0,0,0) 70%)',
            animation: 'pulse 4s infinite ease-in-out'
          }}
        />
        
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
                  color: '#CC0000',
                  mb: 2,
                  letterSpacing: '3px',
                  fontWeight: 500
                }}
              >
                ABOUT US
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 4,
                  fontWeight: 700,
                  lineHeight: 1.3
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
      <Box 
        sx={{ 
          py: 8, 
          bgcolor: '#f8f8f8',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: 'radial-gradient(#CC0000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        <Container>
          <Grid container spacing={4} justifyContent="center" className="fade-in-section">
            <Grid item xs={12} textAlign="center">
              <Typography variant="h4" sx={{ mb: 4, color: '#CC0000' }}>Contact Us</Typography>
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

      <style jsx global>{`
        @keyframes float0 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(20px, 20px) rotate(5deg); } }
        @keyframes float1 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-20px, 10px) rotate(-5deg); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(15px, -15px) rotate(3deg); } }
        @keyframes float3 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-15px, -10px) rotate(-3deg); } }
        @keyframes float4 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(10px, 15px) rotate(5deg); } }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
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