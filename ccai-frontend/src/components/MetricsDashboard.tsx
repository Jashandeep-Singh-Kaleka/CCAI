import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const MetricsDashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Business Metrics
      </Typography>
      <Card>
        <CardContent>
          <Typography>Advanced metrics and analytics coming soon...</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MetricsDashboard;