import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from '../components/Header';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import GroupsIcon from '@mui/icons-material/Groups';

const Home = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Box>
      <Header />
      
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url('https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2069&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            transition: 'all 0.3s ease'
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h1" 
            color="white"
            sx={{ 
              fontWeight: 800,
              mb: 3,
              maxWidth: '800px',
              fontSize: { xs: '2.5rem', md: '4.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              animation: 'fadeIn 2s ease-out',
              letterSpacing: '2px',
              lineHeight: 1.2
            }}
          >
            Nghệ Thuật Ẩm Thực Tinh Tế
          </Typography>
          
          <Typography 
            variant="h5"
            color="white"
            sx={{ 
              mb: 4,
              maxWidth: '600px',
              lineHeight: 1.8,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              animation: 'fadeIn 2s ease-out 0.5s backwards',
              fontWeight: 300,
              letterSpacing: '1px'
            }}
          >
            Khám phá hương vị độc đáo được tạo nên từ sự kết hợp giữa ẩm thực truyền thống và hiện đại
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/menu')}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              borderRadius: '2px',
              boxShadow: '0 4px 14px 0 rgba(200,169,126,0.39)',
              animation: 'fadeIn 2s ease-out 1s backwards',
              fontFamily: '"Montserrat", sans-serif',
              letterSpacing: '1px',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px 0 rgba(200,169,126,0.39)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            KHÁM PHÁ THỰC ĐƠN
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Box 
        ref={aboutRef}
        sx={{ 
          py: 15,
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
      >
        <Container>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} className="fade-in-section">
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                sx={{
                  width: '100%',
                  height: '600px',
                  objectFit: 'cover',
                  boxShadow: '40px 40px 0px 0px rgba(200,169,126,0.2)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className="fade-in-section">
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'primary.main',
                  mb: 2,
                  fontFamily: '"Montserrat", sans-serif',
                  letterSpacing: '3px',
                  fontWeight: 500
                }}
              >
                VỀ CHÚNG TÔI
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 4,
                  fontWeight: 700,
                  lineHeight: 1.3
                }}
              >
                Câu Chuyện Của FairyDragon
              </Typography>
              <Typography 
                sx={{ 
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                Được thành lập từ năm 2010, FairyDragon là nơi hội tụ của những đầu bếp tài năng với niềm đam mê ẩm thực mãnh liệt. Chúng tôi không ngừng sáng tạo để mang đến những trải nghiệm ẩm thực độc đáo, kết hợp giữa hương vị truyền thống và phong cách hiện đại.
              </Typography>
              <Typography 
                sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                Mỗi món ăn tại FairyDragon đều là một tác phẩm nghệ thuật, được chế biến từ những nguyên liệu tươi ngon nhất, với sự tỉ mỉ và tâm huyết của đội ngũ đầu bếp chuyên nghiệp.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 15, backgroundColor: '#F8F8F8' }}>
        <Container>
          <Grid container spacing={6}>
            {/* ... (giữ nguyên 3 features như cũ) ... */}
          </Grid>
        </Container>
      </Box>

      {/* CSS cho animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(20vh);
          transition: all 1s ease-out;
        }

        .fade-in-section.animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </Box>
  );
};

export default Home;