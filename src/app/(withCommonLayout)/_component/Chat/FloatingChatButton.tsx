import React from 'react';
import { Box, Fab, keyframes } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 70, sm: 24 }, // Adjust for mobile navbar height
        right: { xs: 16, sm: 24 },
        zIndex: 1300, // Ensure it's above most elements, including AppBar (z-index 1100)
      }}
    >
      <Fab
        color="primary"
        aria-label="chat"
        onClick={onClick}
        sx={{
          animation: `${pulse} 2s infinite`,
        }}
      >
        <ChatIcon />
      </Fab>
    </Box>
  );
};

export default FloatingChatButton;
