import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tab,
  Tabs,
  Button,
  Badge,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Email,
  Phone,
  Flag,
  Schedule,
  CheckCircle,
  Priority,
  Reply,
  Forward
} from '@mui/icons-material';
import axios from 'axios';

interface Communication {
  id: number;
  type: 'email' | 'call';
  subject?: string;
  from?: string;
  caller?: string;
  phone?: string;
  content?: string;
  summary?: string;
  category: string;
  priority: string;
  timestamp: string;
  status: string;
  duration?: string;
}

const CommunicationCenter: React.FC = () => {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [categories, setCategories] = useState<any>({});
  const [activeTab, setActiveTab] = useState(0);
  const [selectedComm, setSelectedComm] = useState<Communication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchCommunications();
    fetchCategories();
  }, []);

  const fetchCommunications = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/communication/all');
      setCommunications(response.data);
    } catch (error) {
      console.error('Error fetching communications:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/communication/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getFilteredCommunications = () => {
    switch (activeTab) {
      case 0: return communications; // All
      case 1: return communications.filter(c => c.type === 'email');
      case 2: return communications.filter(c => c.type === 'call');
      case 3: return communications.filter(c => c.status === 'unread');
      default: return communications;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lead': return 'success';
      case 'financial': return 'primary';
      case 'operations': return 'secondary';
      default: return 'default';
    }
  };

  const handleCommClick = (comm: Communication) => {
    setSelectedComm(comm);
    setDialogOpen(true);
  };

  const renderCommunicationItem = (comm: Communication) => (
    <ListItem
      key={comm.id}
      button
      onClick={() => handleCommClick(comm)}
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        mb: 1,
        bgcolor: comm.status === 'unread' ? '#f3f4f6' : 'white',
        '&:hover': { bgcolor: '#f8f9fa' }
      }}
    >
      <ListItemIcon>
        <Avatar sx={{ bgcolor: comm.type === 'email' ? 'primary.main' : 'secondary.main' }}>
          {comm.type === 'email' ? <Email /> : <Phone />}
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, fontWeight: comm.status === 'unread' ? 600 : 400 }}>
              {comm.subject || comm.summary}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(comm.timestamp).toLocaleDateString()}
            </Typography>
          </Box>
        }
        secondary={
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {comm.from || comm.caller} {comm.phone && `• ${comm.phone}`} {comm.duration && `• ${comm.duration}`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                size="small" 
                label={comm.category} 
                color={getCategoryColor(comm.category)}
                variant="outlined"
              />
              <Chip 
                size="small" 
                label={comm.priority} 
                color={getPriorityColor(comm.priority)}
              />
              {comm.status === 'unread' && (
                <Badge color="primary" variant="dot" />
              )}
            </Box>
          </Box>
        }
      />
    </ListItem>
  );

  const tabs = [
    { label: 'All', count: communications.length },
    { label: 'Emails', count: communications.filter(c => c.type === 'email').length },
    { label: 'Calls', count: communications.filter(c => c.type === 'call').length },
    { label: 'Unread', count: communications.filter(c => c.status === 'unread').length }
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          Communication Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-powered email and call management with automatic categorization
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  {tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {tab.label}
                          <Badge badgeContent={tab.count} color="primary" />
                        </Box>
                      }
                    />
                  ))}
                </Tabs>
              </Box>

              <List sx={{ maxHeight: 600, overflow: 'auto' }}>
                {getFilteredCommunications().map(renderCommunicationItem)}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Categories Overview
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Flag sx={{ color: 'success.main', mr: 1 }} />
                      <Typography>Leads</Typography>
                    </Box>
                    <Chip label={categories.lead?.length || 0} color="success" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Priority sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography>Financial</Typography>
                    </Box>
                    <Chip label={categories.financial?.length || 0} color="primary" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Schedule sx={{ color: 'secondary.main', mr: 1 }} />
                      <Typography>Operations</Typography>
                    </Box>
                    <Chip label={categories.operations?.length || 0} color="secondary" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Quick Actions
                </Typography>
                <Stack spacing={1}>
                  <Button 
                    variant="outlined" 
                    startIcon={<CheckCircle />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                  >
                    Mark All as Read
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Reply />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                  >
                    Bulk Reply
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Forward />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                  >
                    Forward to Team
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  AI Insights
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ p: 2, bgcolor: '#f3f4f6', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      🤖 AI Analysis
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      High-priority leads detected in recent emails. Consider immediate follow-up for Chicago-Denver route inquiries.
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f3f4f6', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      📊 Trend Alert
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Refrigerated transport requests up 25% this week. Opportunity for specialized carriers.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {selectedComm?.subject || selectedComm?.summary}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip 
                size="small" 
                label={selectedComm?.category} 
                color={getCategoryColor(selectedComm?.category || '')}
              />
              <Chip 
                size="small" 
                label={selectedComm?.priority} 
                color={getPriorityColor(selectedComm?.priority || '')}
              />
            </Stack>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                From: {selectedComm?.from || selectedComm?.caller}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {selectedComm && new Date(selectedComm.timestamp).toLocaleString()}
              </Typography>
              {selectedComm?.phone && (
                <Typography variant="body2" color="text.secondary">
                  Phone: {selectedComm.phone}
                </Typography>
              )}
              {selectedComm?.duration && (
                <Typography variant="body2" color="text.secondary">
                  Duration: {selectedComm.duration}
                </Typography>
              )}
            </Box>
            <Divider />
            <Typography variant="body1">
              {selectedComm?.content || selectedComm?.summary || 'No additional details available.'}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Reply />}>
            Reply
          </Button>
          <Button variant="outlined" startIcon={<Forward />}>
            Forward
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommunicationCenter;