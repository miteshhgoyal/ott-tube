import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import resellerRoutes from './routes/resellerRoutes.js';
import distributorRoutes from './routes/distributorRoutes.js';
import ottRoutes from './routes/ottRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import proxyRoutes from './routes/proxyRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

// Middleware
const corsOptions = {
    // origin: process.env.CORS_ORIGIN,
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT', 'OPTIONS'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/resellers', resellerRoutes);
app.use('/api/distributors', distributorRoutes);
app.use('/api/ott', ottRoutes);
app.use('/api/credit', creditRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/proxy', proxyRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
