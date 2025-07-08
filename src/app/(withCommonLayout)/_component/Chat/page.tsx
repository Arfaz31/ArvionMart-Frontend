/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  IconButton, 
  TextField, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Typography,
  Button,
  Chip,
  CircularProgress,
  Tooltip,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { 
  Send, 
  Close, 
  SupportAgent, 
  Person, 
  LocalShipping, 
  SearchOutlined,
  StraightenOutlined, 
  AttachFileOutlined,
  CameraAltOutlined,
  EmojiEmotionsOutlined,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

// Styled components with responsive adjustments
const ChatContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f9f9f9',
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 56px)', // Account for mobile header
  },
}));

const MessageList = styled(List)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: '0.5rem',
  scrollBehavior: 'smooth',
  [theme.breakpoints.up('sm')]: {
    padding: '1rem',
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem',
  borderTop: '1px solid #e0e0e0',
  backgroundColor: '#fff',
  [theme.breakpoints.up('sm')]: {
    padding: '0.5rem 1rem',
  },
}));

const QuickReplyContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  padding: '0.5rem 0',
  gap: '0.5rem',
  marginBottom: '0.5rem',
  '&::-webkit-scrollbar': {
    height: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#bdbdbd',
    borderRadius: '4px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0.25rem 0',
    gap: '0.25rem',
  },
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '0.5rem',
  color: '#666',
  fontSize: '0.85rem',
  [theme.breakpoints.down('sm')]: {
    padding: '0.25rem',
    fontSize: '0.75rem',
  },
}));

const ActionBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.25rem 0',
  [theme.breakpoints.up('sm')]: {
    padding: '0.5rem 0',
  },
}));

const ProductCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  margin: '0.5rem 0',
  maxWidth: '250px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '220px',
    margin: '0.25rem 0',
  },
}));

// Types (same as before)
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'product' | 'order' | 'size-guide';
  data?: any;
}

interface SizeGuide {
  us: string;
  eu: string;
  uk: string;
  cm: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
}

interface OrderStatus {
  orderId: string;
  status: string;
  estimatedDelivery: string;
}

// Sample data (same as before)
const sampleProducts: Product[] = [
  { id: 'shoe1', name: 'Nike Air Max 270', price: 150, image: '/api/placeholder/100/80', sizes: ['US 8', 'US 9', 'US 10'] },
  { id: 'shoe2', name: 'Adidas Ultraboost', price: 180, image: '/api/placeholder/100/80', sizes: ['US 7', 'US 8', 'US 9'] },
  { id: 'shoe3', name: 'Puma RS-X', price: 120, image: '/api/placeholder/100/80', sizes: ['US 8.5', 'US 9.5', 'US 10.5'] },
];

const sampleSizeGuide: SizeGuide[] = [
  { us: 'US 7', eu: 'EU 40', uk: 'UK 6.5', cm: '25 cm' },
  { us: 'US 8', eu: 'EU 41', uk: 'UK 7.5', cm: '26 cm' },
  { us: 'US 9', eu: 'EU 42.5', uk: 'UK 8.5', cm: '27 cm' },
  { us: 'US 10', eu: 'EU 44', uk: 'UK 9.5', cm: '28 cm' },
  { us: 'US 11', eu: 'EU 45', uk: 'UK 10.5', cm: '29 cm' },
];

const sampleOrderStatuses: OrderStatus[] = [
  { orderId: 'ORD-12345', status: 'Shipped', estimatedDelivery: 'April 25, 2025' },
  { orderId: 'ORD-56789', status: 'Processing', estimatedDelivery: 'April 30, 2025' },
];

// Quick reply options (same as before)
const quickReplies = [
  { id: 1, text: 'Popular shoes', action: 'popular_shoes' },
  { id: 2, text: 'Track my order', action: 'track_order' },
  { id: 3, text: 'Size guide', action: 'size_guide' },
  { id: 4, text: 'Return policy', action: 'return_policy' },
  { id: 5, text: 'Shipping info', action: 'shipping_info' },
  { id: 6, text: 'Discount codes', action: 'discount_codes' },
];

const ShoeChat = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Welcome to ShoeStyle! I can help you find the perfect shoes, track orders, or answer questions. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachmentMenu, setAttachmentMenu] = useState<null | HTMLElement>(null);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot analysis and response after a delay
    setTimeout(() => {
      setIsTyping(false);
      processUserMessage(inputValue);
    }, 1500);
  };

  const processUserMessage = (message: string) => {
    const normalizedMsg = message.toLowerCase();
    
    // Check keywords to determine type of response
    if (normalizedMsg.includes('size') || normalizedMsg.includes('fit')) {
      sendSizeGuideMessage();
    } else if (normalizedMsg.includes('order') || normalizedMsg.includes('track') || normalizedMsg.includes('shipping')) {
      sendOrderStatusMessage();
    } else if (normalizedMsg.includes('recommend') || normalizedMsg.includes('suggestion') || 
              normalizedMsg.includes('running') || normalizedMsg.includes('shoes')) {
      sendProductRecommendations();
    } else {
      // Default response
      const botMessage: Message = {
        id: messages.length + 2,
        text: `Thanks for your message! I'd be happy to help with your shoe needs. Could you tell me more about what you're looking for? Or select one of the quick options below.`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const handleQuickReply = (action: string) => {
    switch (action) {
      case 'popular_shoes':
        // First add user message
        const userMsg: Message = {
          id: messages.length + 1,
          text: 'Show me popular shoes',
          sender: 'user',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);
        
        // Then simulate bot response
        setTimeout(() => {
          setIsTyping(false);
          sendProductRecommendations();
        }, 1000);
        break;
        
      case 'track_order':
        const trackMsg: Message = {
          id: messages.length + 1,
          text: 'I want to track my order',
          sender: 'user',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, trackMsg]);
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          sendOrderStatusMessage();
        }, 1000);
        break;
        
      case 'size_guide':
        const sizeMsg: Message = {
          id: messages.length + 1,
          text: 'I need help with sizing',
          sender: 'user',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, sizeMsg]);
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          sendSizeGuideMessage();
        }, 1000);
        break;
        
      case 'return_policy':
        const returnMsg: Message = {
          id: messages.length + 1,
          text: 'What is your return policy?',
          sender: 'user',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, returnMsg]);
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          const botMessage: Message = {
            id: messages.length + 2,
            text: 'We offer a 30-day return policy on all unworn shoes with original packaging. You can initiate a return from your account or contact customer support for assistance.',
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
        break;
        
      case 'shipping_info':
        const shippingMsg: Message = {
          id: messages.length + 1,
          text: 'Tell me about shipping options',
          sender: 'user',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, shippingMsg]);
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          const botMessage: Message = {
            id: messages.length + 2,
            text: 'We offer free standard shipping on orders over $75 (5-7 business days). Express shipping (2-3 business days) is available for $12.99. Next-day delivery is available for $19.99 on orders placed before 2 PM.',
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
        break;
        
      case 'discount_codes':
        const discountMsg: Message = {
          id: messages.length + 1,
          text: 'Are there any active discount codes?',
          sender: 'user',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, discountMsg]);
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          const botMessage: Message = {
            id: messages.length + 2,
            text: 'Currently, you can use code SPRING25 for 25% off your first purchase. We also have a special promotion for loyalty members: LOYALTY10 for an extra 10% off sale items!',
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
        break;
      
      default:
        break;
    }
  };

  const sendProductRecommendations = () => {
    const botMessage: Message = {
      id: messages.length + 2,
      text: 'Here are some popular shoes you might like:',
      sender: 'bot',
      timestamp: new Date(),
      type: 'product',
      data: sampleProducts
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const sendOrderStatusMessage = () => {
    const botMessage: Message = {
      id: messages.length + 2,
      text: 'I can help with order tracking. Here are your recent orders:',
      sender: 'bot',
      timestamp: new Date(),
      type: 'order',
      data: sampleOrderStatuses
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const sendSizeGuideMessage = () => {
    const botMessage: Message = {
      id: messages.length + 2,
      text: 'Here\'s our shoe size conversion chart to help you find the perfect fit:',
      sender: 'bot',
      timestamp: new Date(),
      type: 'size-guide',
      data: sampleSizeGuide
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleAttachmentClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAttachmentMenu(event.currentTarget);
  };

  const handleAttachmentClose = () => {
    setAttachmentMenu(null);
  };

  // Render message content based on type
  const renderMessageContent = (message: Message) => {
    if (message.type === 'product' && message.data) {
      return (
        <>
          <Typography variant="body1" sx={{ 
            color: message.sender === 'user' ? 'common.white' : 'text.primary', 
            mb: 1,
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}>
            {message.text}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {message.data.map((product: Product) => (
              <ProductCard key={product.id}>
                <Box sx={{ display: 'flex', p: 1 }}>
                  <Box sx={{ mr: 1 }}>
                    <Image
                      src={product.image} 
                      alt={product.name} 
                      width={isMobile ? 80 : 100} 
                      height={isMobile ? 64 : 80} 
                      style={{ objectFit: 'cover' }} 
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="primary.main" fontWeight="bold" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      ${product.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.625rem' : '0.75rem' }}>
                      {product.sizes.join(', ')}
                    </Typography>
                    <Button 
                      size="small" 
                      variant="contained" 
                      color="primary" 
                      sx={{ 
                        mt: 0.5, 
                        fontSize: isMobile ? '0.6rem' : '0.7rem',
                        padding: isMobile ? '2px 8px' : '4px 12px'
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </ProductCard>
            ))}
          </Box>
        </>
      );
    } else if (message.type === 'order' && message.data) {
      return (
        <>
          <Typography variant="body1" sx={{ 
            color: message.sender === 'user' ? 'common.white' : 'text.primary', 
            mb: 1,
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}>
            {message.text}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {message.data.map((order: OrderStatus) => (
              <Box key={order.orderId} sx={{ 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                p: 1,
                backgroundColor: '#fff'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                    Order #{order.orderId}
                  </Typography>
                  <Chip 
                    size="small" 
                    label={order.status} 
                    color={order.status === 'Shipped' ? 'success' : 'warning'} 
                    variant="outlined"
                    sx={{ 
                      height: isMobile ? 20 : 24,
                      fontSize: isMobile ? '0.625rem' : '0.75rem'
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.625rem' : '0.75rem' }}>
                  Estimated delivery: {order.estimatedDelivery}
                </Typography>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="primary" 
                  sx={{ 
                    mt: 0.5, 
                    fontSize: isMobile ? '0.6rem' : '0.7rem',
                    padding: isMobile ? '2px 8px' : '4px 12px'
                  }}
                  startIcon={<LocalShipping fontSize={isMobile ? 'small' : 'medium'} />}
                >
                  Track Shipment
                </Button>
              </Box>
            ))}
          </Box>
        </>
      );
    } else if (message.type === 'size-guide' && message.data) {
      return (
        <>
          <Typography variant="body1" sx={{ 
            color: message.sender === 'user' ? 'common.white' : 'text.primary', 
            mb: 1,
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}>
            {message.text}
          </Typography>
          <Box sx={{ 
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            width: 'fit-content',
            maxWidth: '100%',
            overflowX: 'auto',
          }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderBottom: '1px solid #e0e0e0',
              backgroundColor: '#f5f5f5',
              minWidth: isMobile ? '280px' : '320px',
            }}>
              <Typography variant="caption" sx={{ p: 1, fontWeight: 'bold', textAlign: 'center', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>US</Typography>
              <Typography variant="caption" sx={{ p: 1, fontWeight: 'bold', textAlign: 'center', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>EU</Typography>
              <Typography variant="caption" sx={{ p: 1, fontWeight: 'bold', textAlign: 'center', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>UK</Typography>
              <Typography variant="caption" sx={{ p: 1, fontWeight: 'bold', textAlign: 'center', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>CM</Typography>
            </Box>
            {message.data.map((size: SizeGuide, index: number) => (
              <Box key={index} sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                borderBottom: index < message.data.length - 1 ? '1px solid #e0e0e0' : 'none',
                minWidth: isMobile ? '280px' : '320px',
              }}>
                <Typography variant="caption" sx={{ p: 1, textAlign: 'center', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>{size.us}</Typography>
                <Typography variant="caption" sx={{ p: 1, textAlign: 'center', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>{size.eu}</Typography>
                <Typography variant="caption" sx={{ p: 1, textAlign: 'center', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>{size.uk}</Typography>
                <Typography variant="caption" sx={{ p: 1, textAlign: 'center', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>{size.cm}</Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>
            Pro tip: For the best fit, measure your foot in the evening when it&apos;s at its largest!
          </Typography>
        </>
      );
    } else {
      return (
        <Typography sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
          {message.text}
        </Typography>
      );
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: isMobile ? 'fixed' : 'absolute',
          bottom: isMobile ? 0 : '6rem',
          right: isMobile ? 0 : '2rem',
          margin: 0,
          height: isMobile ? '100vh' : '550px',
          maxHeight: isMobile ? '100%' : 'calc(100vh - 8rem)',
          borderRadius: isMobile ? 0 : '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          maxWidth: isMobile ? '100%' : '400px',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #e0e0e0',
        padding: isMobile ? '12px 16px' : '16px 24px',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            mr: 1,
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
          }}>
            <SupportAgent fontSize={isMobile ? 'small' : 'medium'} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
              ShoeStyle Support
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.625rem' : '0.75rem' }}>
              Typically replies in 1 minute
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={onClose}
          size={isMobile ? 'small' : 'medium'}
        >
          <Close fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <ChatContainer>
          <MessageList>
            {messages.map((message) => (
              <ListItem 
                key={message.id} 
                sx={{ 
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 0.5,
                  mb: 1,
                  px: isMobile ? 1 : 2,
                  py: 0,
                }}
              >
                <ListItemAvatar sx={{ minWidth: isMobile ? '32px' : '40px' }}>
                  <Avatar sx={{ 
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                  }}>
                    {message.sender === 'user' ? (
                      <Person fontSize={isMobile ? 'small' : 'medium'} />
                    ) : (
                      <SupportAgent fontSize={isMobile ? 'small' : 'medium'} />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={renderMessageContent(message)}
                  secondary={message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  sx={{
                    textAlign: message.sender === 'user' ? 'right' : 'left',
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.50',
                    borderRadius: message.sender === 'user' ? '12px 0 12px 12px' : '0 12px 12px 12px',
                    px: isMobile ? 1.5 : 2,
                    py: isMobile ? 0.75 : 1,
                    maxWidth: message.type ? (isMobile ? '90%' : '85%') : (isMobile ? '80%' : '70%'),
                    wordBreak: 'break-word',
                    m: 0,
                  }}
                  primaryTypographyProps={{
                    color: message.sender === 'user' ? 'common.white' : 'text.primary',
                    variant: 'body2',
                    component: 'div',
                  }}
                  secondaryTypographyProps={{
                    color: message.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                    variant: 'caption',
                    fontSize: isMobile ? '0.6rem' : '0.7rem',
                  }}
                />
              </ListItem>
            ))}
            {isTyping && (
              <TypingIndicator>
                <CircularProgress size={isMobile ? 12 : 16} />
                <Typography variant="caption">ShoeStyle Support is typing...</Typography>
              </TypingIndicator>
            )}
            <div ref={messageEndRef} />
          </MessageList>
          
          <QuickReplyContainer>
            {quickReplies.map((reply) => (
              <Chip 
                key={reply.id}
                label={reply.text} 
                onClick={() => handleQuickReply(reply.action)}
                clickable
                color="primary"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  fontSize: isMobile ? '0.625rem' : '0.75rem',
                  height: isMobile ? 24 : 32,
                }}
              />
            ))}
          </QuickReplyContainer>
          
          <InputContainer>
            <ActionBar>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title="Attach file">
                  <IconButton 
                    size={isMobile ? 'small' : 'medium'}
                    onClick={handleAttachmentClick}
                  >
                    <AttachFileOutlined fontSize={isMobile ? 'small' : 'medium'} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={attachmentMenu}
                  open={Boolean(attachmentMenu)}
                  onClose={handleAttachmentClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleAttachmentClose} dense={isMobile}>
                    <CameraAltOutlined fontSize="small" sx={{ mr: 1 }} /> 
                    <Typography variant="body2">Upload photo of shoes</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleAttachmentClose} dense={isMobile}>
                    <StraightenOutlined fontSize="small" sx={{ mr: 1 }} /> 
                    <Typography variant="body2">Upload foot measurement</Typography>
                  </MenuItem>
                </Menu>
                <Tooltip title="Emoji">
                  <IconButton size={isMobile ? 'small' : 'medium'}>
                    <EmojiEmotionsOutlined fontSize={isMobile ? 'small' : 'medium'} />
                  </IconButton>
                </Tooltip>
              </Box>
            </ActionBar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Ask about shoes, orders, or sizing..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                size="small"
                sx={{ 
                  mr: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    paddingLeft: '8px',
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <SearchOutlined 
                      color="action" 
                      sx={{ 
                        fontSize: isMobile ? '1rem' : '1.2rem', 
                        mr: 0.5 
                      }} 
                    />
                  ),
                }}
              />
              <IconButton 
                color="primary" 
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                sx={{ 
                  bgcolor: inputValue.trim() !== '' ? 'primary.main' : 'grey.300',
                  color: 'white',
                  '&:hover': {
                    bgcolor: inputValue.trim() !== '' ? 'primary.dark' : 'grey.300',
                  },
                  width: isMobile ? 36 : 40,
                  height: isMobile ? 36 : 40,
                  flexShrink: 0,
                }}
              >
                <Send fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
            </Box>
          </InputContainer>
        </ChatContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ShoeChat;