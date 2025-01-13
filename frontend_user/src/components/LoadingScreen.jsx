import { Box, Typography, LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        
        if (newProgress === 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
        }
        
        return Math.min(newProgress, 100);
      });
    }, 20);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadingComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: '#CC0000',
            borderRadius: '50%',
            animation: `particle${i} ${Math.random() * 3 + 2}s infinite linear`,
            opacity: 0.3
          }}
        />
      ))}

      <Typography
        variant="h2"
        sx={{
          color: '#fff',
          mb: 4,
          fontWeight: 700,
          letterSpacing: '3px',
          animation: 'pulse 2s infinite',
          textShadow: '0 0 10px rgba(204, 0, 0, 0.5)'
        }}
      >
        FAIRY DRAGON
      </Typography>
      
      <Box sx={{ width: '300px', position: 'relative' }}>
        <LinearProgress 
          variant="determinate" 
          value={progress}
          sx={{
            height: 6,
            backgroundColor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#CC0000'
            }
          }}
        />
        <Typography 
          sx={{ 
            color: '#fff',
            position: 'absolute',
            right: 0,
            top: '10px',
            fontSize: '14px'
          }}
        >
          {progress}%
        </Typography>
      </Box>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        ${[...Array(20)].map((_, i) => `
          @keyframes particle${i} {
            0% {
              transform: translate(${Math.random() * 100}vw, ${Math.random() * 100}vh) scale(1);
            }
            100% {
              transform: translate(${Math.random() * 100}vw, ${Math.random() * 100}vh) scale(0);
            }
          }
        `).join('\n')}
      `}</style>
    </Box>
  );
};

export default LoadingScreen;