require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ====== Middleware ======
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// IMPORTANT: CORS must allow your frontend domain
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(cors({
  origin: clientUrl,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ====== Logging Middleware (helps debug) ======
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// ====== Root Route ======
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'SK Group Backend is running 🚀',
    endpoints: {
      auth: '/api/auth',
      enquiries: '/api/enquiries',
      health: '/api/health'
    }
  });
});

// ====== API Routes (MUST be defined BEFORE the catch-all) ======
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);

// ====== Health Check ======
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'SK Group Backend is running',
    timestamp: new Date().toISOString()
  });
});

// ====== Catch-all for undefined routes ======
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    path: req.url 
  });
});

// ====== Create HTTP Server (NO SSL for Render) ======
const http = require('http');
const server = http.createServer(app);

// ====== Socket.IO ======
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: clientUrl,
    credentials: true,
  },
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('🟢 Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// ====== Start Server ======
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.IO is ready`);
  console.log(`🔗 CORS allows: ${clientUrl}`);
});
