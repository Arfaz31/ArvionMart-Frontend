'use client'
// components/FloatingComponent.tsx
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Fab, Tooltip, Zoom } from '@mui/material';
import { Help, Close, Chat, } from '@mui/icons-material';
import ChatConversation from '../Chat/page';

const FloatingContainer = styled(Box)(({  }) => ({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  zIndex: 1500,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '1rem',
}));

const FloatingMenu = styled(Box)(({  }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  transition: 'transform 0.3s ease-out',
}));

const FloatingComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChatOpen = () => {
    setChatOpen(true);
    setIsOpen(false);
  };
  // Handle scroll to hide/show the floating component
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <FloatingContainer sx={{ 
        transform: isVisible ? 'translateY(0)' : 'translateY(150%)',
        transition: 'transform 0.3s ease-out',
      }}>
        {isOpen && (
          <FloatingMenu sx={{ 
            transform: isOpen ? 'translateY(0)' : 'translateY(50px)',
            opacity: isOpen ? 1 : 0,
          }}>
            <Zoom in={isOpen} style={{ transitionDelay: isOpen ? '100ms' : '0ms' }}>
              <Tooltip title="Help" placement="left">
                <Fab 
                  size="medium" 
                  color="secondary" 
                  aria-label="help"
                  sx={{ boxShadow: 3 }}
                >
                  <Help />
                </Fab>
              </Tooltip>
            </Zoom>
            
            <Zoom in={isOpen} style={{ transitionDelay: isOpen ? '150ms' : '0ms' }}>
              <Tooltip title="Chat" placement="left">
                <Fab 
                  size="medium" 
                  color="info" 
                  aria-label="chat"
                  sx={{ boxShadow: 3 }}
                  onClick={handleChatOpen}
                >
                  <Chat />
                </Fab>
              </Tooltip>
            </Zoom>
          </FloatingMenu>
        )}
        
        <Fab 
          color="primary" 
          aria-label="toggle menu" 
          onClick={toggleMenu}
          sx={{ 
            boxShadow: 4,
            transition: 'transform 0.3s ease-in-out',
            transform: isOpen ? 'rotate(45deg)' : 'none',
          }}
        >
          {isOpen ? <Close /> : <Help />}
        </Fab>
      </FloatingContainer>

      <ChatConversation open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default FloatingComponent;
                