import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  SmartToy,
  Send,
  ContentCopy,
  Email,
  Phone,
  Analytics,
  AutoAwesome
} from '@mui/icons-material';
import axios from 'axios';

const AIAssistant: React.FC = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [bidDialogOpen, setBidDialogOpen] = useState(false);
  const [bidType, setBidType] = useState<'email_bid' | 'voice_bid'>('email_bid');
  const [bidContent, setBidContent] = useState('');
  const [loadDetails, setLoadDetails] = useState({
    origin: '',
    destination: '',
    commodity: '',
    weight: '',
    suggestedRate: ''
  });
  const [customerInfo, setCustomerInfo] = useState({
    contactName: '',
    companyName: '',
    phone: ''
  });

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = { role: 'user', content: chatMessage, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const response = await axios.post('http://localhost:3001/api/chatbot/chat', {
        message: chatMessage,
        context: 'trucking_brokerage'
      });

      const aiMessage = { 
        role: 'assistant', 
        content: response.data.response, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.', 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }

    setChatMessage('');
  };

  const handleGenerateBid = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/chatbot/draft-bid', {
        type: bidType,
        loadDetails,
        customerInfo,
        notes: 'Generated from CCAI AI Assistant'
      });

      setBidContent(response.data.content);
    } catch (error) {
      console.error('Error generating bid:', error);
      setBidContent('Error generating bid. Please try again.');
    }
  };

  const bidTemplates = [
    {
      title: 'Email Bid Response',
      description: 'Professional email template for freight quotes',
      type: 'email_bid' as const,
      icon: <Email />
    },
    {
      title: 'Voice Call Script',
      description: 'Talking points for phone bid discussions',
      type: 'voice_bid' as const,
      icon: <Phone />
    },
    {
      title: 'Load Analysis',
      description: 'AI-powered market analysis and recommendations',
      type: 'load_analysis' as const,
      icon: <Analytics />
    }
  ];

  const quickPrompts = [
    'How do I calculate the best rate for a Chicago to Denver load?',
    'What should I include in a carrier agreement?',
    'How to handle a delivery delay situation?',
    'Best practices for customer retention in trucking brokerage',
    'How to negotiate with carriers effectively?'
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          AI Assistant
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ChatGPT-powered assistant for bid drafting, market analysis, and trucking expertise
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 600 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <SmartToy sx={{ mr: 1, color: 'primary.main' }} />
                Chat with CCAI Assistant
              </Typography>
              
              <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                {chatHistory.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <SmartToy sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Hello! I'm your AI assistant for trucking brokerage.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Ask me about rates, routes, carrier management, or anything trucking-related!
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    {chatHistory.map((message, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <Paper
                          sx={{
                            p: 2,
                            maxWidth: '70%',
                            bgcolor: message.role === 'user' ? 'primary.main' : 'white',
                            color: message.role === 'user' ? 'white' : 'text.primary'
                          }}
                        >
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.content}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </Typography>
                        </Paper>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Ask me anything about trucking brokerage..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  sx={{ minWidth: 'auto', px: 3 }}
                >
                  <Send />
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  AI Bid Generator
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Generate professional bids and call scripts with AI assistance
                </Typography>
                
                <Stack spacing={2}>
                  {bidTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      fullWidth
                      startIcon={template.icon}
                      onClick={() => {
                        setBidType(template.type);
                        setBidDialogOpen(true);
                      }}
                      sx={{ 
                        justifyContent: 'flex-start', 
                        textTransform: 'none',
                        p: 2,
                        height: 'auto'
                      }}
                    >
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {template.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {template.description}
                        </Typography>
                      </Box>
                    </Button>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Quick Questions
                </Typography>
                <List dense>
                  {quickPrompts.map((prompt, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        button
                        onClick={() => setChatMessage(prompt)}
                        sx={{ borderRadius: 1, mb: 0.5 }}
                      >
                        <ListItemText
                          primary={prompt}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'primary.main'
                          }}
                        />
                      </ListItem>
                      {index < quickPrompts.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        open={bidDialogOpen}
        onClose={() => setBidDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutoAwesome sx={{ mr: 1, color: 'primary.main' }} />
            Generate {bidType === 'email_bid' ? 'Email Bid' : bidType === 'voice_bid' ? 'Call Script' : 'Load Analysis'}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Origin"
                  value={loadDetails.origin}
                  onChange={(e) => setLoadDetails({...loadDetails, origin: e.target.value})}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Destination"
                  value={loadDetails.destination}
                  onChange={(e) => setLoadDetails({...loadDetails, destination: e.target.value})}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Commodity"
                  value={loadDetails.commodity}
                  onChange={(e) => setLoadDetails({...loadDetails, commodity: e.target.value})}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Weight (lbs)"
                  value={loadDetails.weight}
                  onChange={(e) => setLoadDetails({...loadDetails, weight: e.target.value})}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Suggested Rate ($)"
                  value={loadDetails.suggestedRate}
                  onChange={(e) => setLoadDetails({...loadDetails, suggestedRate: e.target.value})}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  value={customerInfo.contactName}
                  onChange={(e) => setCustomerInfo({...customerInfo, contactName: e.target.value})}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Company"
                  value={customerInfo.companyName}
                  onChange={(e) => setCustomerInfo({...customerInfo, companyName: e.target.value})}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                />
              </Grid>
            </Grid>

            {bidContent && (
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Generated Content</Typography>
                  <Button
                    startIcon={<ContentCopy />}
                    onClick={() => navigator.clipboard.writeText(bidContent)}
                    size="small"
                  >
                    Copy
                  </Button>
                </Box>
                <Paper sx={{ p: 3, bgcolor: '#f8f9fa', maxHeight: 400, overflow: 'auto' }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                    {bidContent}
                  </Typography>
                </Paper>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBidDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGenerateBid} startIcon={<AutoAwesome />}>
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AIAssistant;