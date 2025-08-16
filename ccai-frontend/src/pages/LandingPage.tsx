import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Chip,
  Stack
} from '@mui/material';
import {
  LocalShipping,
  AutoAwesome,
  Analytics,
  Phone,
  Email,
  AttachMoney,
  Speed,
  Security,
  Support
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Email />,
      title: 'Smart Email Sorting',
      description: 'AI-powered email categorization automatically sorts communications into leads, invoices, and operations.'
    },
    {
      icon: <Phone />,
      title: 'Call Management',
      description: 'Intelligent call routing and transcription with automated follow-up reminders and priority classification.'
    },
    {
      icon: <AttachMoney />,
      title: 'Invoice Processing',
      description: 'Streamlined invoice management with automated payment tracking and financial reporting.'
    },
    {
      icon: <Analytics />,
      title: 'Business Analytics',
      description: 'Real-time dashboards and metrics to track performance, margins, and operational efficiency.'
    },
    {
      icon: <AutoAwesome />,
      title: 'AI Bid Assistant',
      description: 'ChatGPT-powered bid drafting for both email and voice communications with market rate analysis.'
    },
    {
      icon: <LocalShipping />,
      title: 'Lead Management',
      description: 'Comprehensive CRM system to track prospects, manage customer relationships, and close deals.'
    }
  ];

  const benefits = [
    { icon: <Speed />, title: '80% Faster Processing', description: 'Reduce manual work with AI automation' },
    { icon: <AttachMoney />, title: '25% Higher Margins', description: 'Better rate optimization and cost control' },
    { icon: <Security />, title: 'Enterprise Security', description: 'Bank-level security for your data' },
    { icon: <Support />, title: '24/7 Support', description: 'Round-the-clock customer assistance' }
  ];

  return (
    <Box>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <LocalShipping sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
            <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>
              CCAI
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button color="primary" sx={{ textTransform: 'none' }}>Features</Button>
            <Button color="primary" sx={{ textTransform: 'none' }}>Pricing</Button>
            <Button color="primary" sx={{ textTransform: 'none' }}>Contact</Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/login')}
              sx={{ textTransform: 'none' }}
            >
              Demo Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip 
                label="AI-Powered Trucking Brokerage" 
                color="secondary" 
                sx={{ mb: 3, fontWeight: 600 }} 
              />
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3, lineHeight: 1.2 }}>
                Revolutionize Your Trucking Operations with AI
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                CCAI automates your communication workflows, processes invoices intelligently, 
                manages leads effectively, and provides AI-powered bid assistance to maximize your margins.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/login')}
                  sx={{ 
                    textTransform: 'none', 
                    py: 1.5, 
                    px: 4, 
                    fontSize: '1.1rem',
                    bgcolor: 'secondary.main',
                    '&:hover': { bgcolor: 'secondary.dark' }
                  }}
                >
                  Try Demo Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    textTransform: 'none', 
                    py: 1.5, 
                    px: 4, 
                    fontSize: '1.1rem',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  borderRadius: 4, 
                  p: 4,
                  textAlign: 'center'
                }}
              >
                <LocalShipping sx={{ fontSize: 120, mb: 2, opacity: 0.8 }} />
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Complete AI-Driven Platform
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 3, color: 'text.primary' }}>
            Powerful Features for Modern Brokerages
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Everything you need to streamline operations, increase efficiency, and grow your trucking brokerage business.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  p: 2,
                  '&:hover': { 
                    transform: 'translateY(-8px)', 
                    boxShadow: 4,
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {React.cloneElement(feature.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: '#f8f9fa', py: 12 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Why Choose CCAI?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Proven results that drive real business value
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box textAlign="center">
                  <Box sx={{ color: 'secondary.main', mb: 2 }}>
                    {React.cloneElement(benefit.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {benefit.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {benefit.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box 
          sx={{ 
            textAlign: 'center',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            p: 8
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Ready to Transform Your Brokerage?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join hundreds of brokerages already using CCAI to streamline their operations
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/login')}
            sx={{ 
              bgcolor: 'secondary.main',
              textTransform: 'none',
              py: 2,
              px: 6,
              fontSize: '1.2rem',
              '&:hover': { bgcolor: 'secondary.dark' }
            }}
          >
            Start Your Demo Today
          </Button>
        </Box>
      </Container>

      <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocalShipping sx={{ mr: 1, fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  CCAI
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                The future of trucking brokerage is here. Automate your workflows, 
                optimize your operations, and grow your business with AI.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  Features
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  Pricing
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  Support
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                >
                  Demo Login
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid #333', mt: 6, pt: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              © 2024 CCAI. All rights reserved. Built for the modern trucking brokerage.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;