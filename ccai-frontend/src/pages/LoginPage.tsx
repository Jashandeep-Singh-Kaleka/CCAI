import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Divider,
  Card
} from '@mui/material';
import { LocalShipping, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', credentials);
      
      localStorage.setItem('ccai_token', response.data.token);
      localStorage.setItem('ccai_user', JSON.stringify(response.data.user));
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadDemoCredentials = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/auth/demo-credentials');
      setCredentials(response.data);
    } catch (err) {
      setCredentials({
        email: 'demo@ccai.com',
        password: 'demo123'
      });
    }
  };

  React.useEffect(() => {
    loadDemoCredentials();
  }, []);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ p: 6, borderRadius: 4 }}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <LocalShipping sx={{ color: 'primary.main', mr: 1, fontSize: 40 }} />
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                CCAI
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography color="text.secondary">
              Sign in to your trucking brokerage dashboard
            </Typography>
          </Box>

          <Card sx={{ p: 3, mb: 3, bgcolor: '#e3f2fd', border: '1px solid #2196f3' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              🚛 Demo Access
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Experience the full CCAI platform with sample trucking brokerage data
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box>
                <Typography variant="caption" display="block" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  demo@ccai.com
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" display="block" color="text.secondary">
                  Password
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  demo123
                </Typography>
              </Box>
            </Stack>
          </Card>

          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ minWidth: 'auto', p: 1 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  )
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  py: 1.5, 
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  borderRadius: 2
                }}
              >
                {loading ? 'Signing In...' : 'Sign In to Dashboard'}
              </Button>

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={loadDemoCredentials}
                sx={{ 
                  py: 1.5, 
                  textTransform: 'none',
                  borderRadius: 2
                }}
              >
                Load Demo Credentials
              </Button>
            </Stack>
          </form>

          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button 
              color="primary" 
              onClick={() => navigate('/')}
              sx={{ textTransform: 'none' }}
            >
              ← Back to Home
            </Button>
          </Box>
        </Paper>

        <Box textAlign="center" sx={{ mt: 4, color: 'white' }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Demo Features Include: AI Communication Sorting • Invoice Processing • Lead Management • Financial Analytics • ChatGPT Bid Assistant
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;