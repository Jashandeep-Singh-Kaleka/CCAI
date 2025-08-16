import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import { People, TrendingUp, Phone, Email } from '@mui/icons-material';
import axios from 'axios';

const LeadManagement: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    fetchLeads();
    fetchSummary();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/leads/summary');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'error';
      case 'warm': return 'warning';
      case 'cold': return 'info';
      case 'qualified': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Lead Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <People sx={{ color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h5">{summary.totalLeads}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Leads</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h5">{summary.highPriorityLeads}</Typography>
                  <Typography variant="body2" color="text.secondary">High Priority</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Lead Status</Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Hot</Typography>
                  <Chip label={summary.statusBreakdown?.hot || 0} color="error" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Warm</Typography>
                  <Chip label={summary.statusBreakdown?.warm || 0} color="warning" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Qualified</Typography>
                  <Chip label={summary.statusBreakdown?.qualified || 0} color="success" size="small" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Lead Sources</Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Website</Typography>
                  <Typography variant="body2">{summary.sourceBreakdown?.website || 0}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Referral</Typography>
                  <Typography variant="body2">{summary.sourceBreakdown?.referral || 0}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Trade Show</Typography>
                  <Typography variant="body2">{summary.sourceBreakdown?.trade_show || 0}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Active Leads</Typography>
          <List>
            {leads.map((lead, index) => (
              <React.Fragment key={lead.id}>
                <ListItem sx={{ px: 0 }}>
                  <Avatar sx={{ mr: 2, bgcolor: getStatusColor(lead.status) + '.main' }}>
                    {lead.companyName.charAt(0)}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                          {lead.companyName}
                        </Typography>
                        <Chip 
                          label={lead.status} 
                          color={getStatusColor(lead.status)}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          label={lead.priority} 
                          color={lead.priority === 'high' ? 'error' : 'default'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {lead.contactPerson} • {lead.origin} → {lead.destination}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {lead.commodityType} • {lead.weight} • {lead.frequency}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          Budget: {lead.budget} • Assigned to: {lead.assignedTo}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                          <Button size="small" startIcon={<Phone />} variant="outlined">
                            Call
                          </Button>
                          <Button size="small" startIcon={<Email />} variant="outlined">
                            Email
                          </Button>
                          <Button size="small" variant="contained">
                            View Details
                          </Button>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < leads.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LeadManagement;