import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import communicationRoutes from './routes/communication';
import invoiceRoutes from './routes/invoices';
import leadRoutes from './routes/leads';
import callRoutes from './routes/calls';
import financialRoutes from './routes/financial';
import chatbotRoutes from './routes/chatbot';
import metricsRoutes from './routes/metrics';
import customerRoutes from './routes/customers';
import carrierRoutes from './routes/carriers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/carriers', carrierRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CCAI Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚛 CCAI Backend running on port ${PORT}`);
});

export default app;