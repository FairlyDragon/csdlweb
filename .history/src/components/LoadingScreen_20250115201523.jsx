import { Box, Typography, LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      {/* Nón lá xoay */}
      <Box
        sx={{
          width: "100px",
          height: "50px",
          borderRadius: "50%",
          border: "2px solid #CC0000",
          transform: "rotate(-35deg)",
          position: "relative",
          mb: 4,
          animation: "conicalHat 3s infinite ease-in-out",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-25px",
            left: "50%",
            transform: "translateX(-50%)",
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: "25px solid #CC0000",
          },
        }}
      />

      <Typography
        variant="h2"
        sx={{
          color: "#fff",
          mb: 4,
          fontFamily: "Chakra Petch, sans-serif", // Thay đổi font ở đây
          fontWeight: 700,
          letterSpacing: "3px",
          animation: "pulse 2s infinite",
          fontSize: "3rem", // Điều chỉnh kích thước nếu cần
        }}
      >
        FAIRY DRAGON
      </Typography>

      <Box sx={{ width: "300px", position: "relative" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            backgroundColor: "rgba(255,255,255,0.1)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#CC0000",
            },
          }}
        />
        <Typography
          sx={{
            color: "#fff",
            position: "absolute",
            right: 0,
            top: "10px",
            fontSize: "14px",
          }}
        >
          {progress}%
        </Typography>
      </Box>

      <style global>{`
        @keyframes conicalHat {
          0%,
          100% {
            transform: rotate(-35deg) scale(1);
          }
          50% {
            transform: rotate(-35deg) scale(1.1);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

LoadingScreen.propTypes = {
  onLoadingComplete: PropTypes.func.isRequired,
};

export default LoadingScreen;
