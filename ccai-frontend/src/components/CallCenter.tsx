import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const CallCenter: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Call Center
      </Typography>
      <Card>
        <CardContent>
          <Typography>Call management features coming soon...</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CallCenter;