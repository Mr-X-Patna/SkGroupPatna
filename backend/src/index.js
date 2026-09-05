require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🎨 Root route – HTML welcome page with styling
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>SK Group Backend</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f5f7fa;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 700px;
          width: 100%;
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 18px 50px rgba(7, 26, 51, 0.13);
          overflow: hidden;
          border: 1px solid rgba(7, 26, 51, 0.08);
        }
        .header {
          background: #071a33;
          padding: 30px 30px 20px;
          text-align: center;
        }
        .header h1 {
          color: #f5b51b;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .header p {
          color: rgba(255,255,255,0.7);
          font-size: 16px;
        }
        .body {
          padding: 30px;
        }
        .status-badge {
          display: inline-block;
          background: #e8f5e9;
          color: #2e7d32;
          padding: 6px 18px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .endpoint-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
        }
        .endpoint-item {
          display: flex;
          align-items: center;
          background: #f5f7fa;
          padding: 12px 18px;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .endpoint-item:hover {
          background: #eaeef4;
        }
        .endpoint-method {
          font-weight: 700;
          color: #071a33;
          background: #f5b51b;
          padding: 2px 12px;
          border-radius: 6px;
          font-size: 12px;
          margin-right: 16px;
          letter-spacing: 0.5px;
        }
        .endpoint-url {
          font-family: 'Consolas', monospace;
          font-size: 15px;
          color: #172033;
          flex: 1;
        }
        .endpoint-desc {
          font-size: 13px;
          color: #667085;
        }
        .footer {
          border-top: 1px solid #eaeef4;
          padding: 18px 30px;
          text-align: center;
          color: #667085;
          font-size: 14px;
          background: #fafbfc;
        }
        .footer a {
          color: #071a33;
          text-decoration: none;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏢 SK Group</h1>
          <p>Backend API Server</p>
        </div>
        <div class="body">
          <div class="status-badge">✅ Server is running</div>
          <p style="font-size: 16px; color: #172033; margin-bottom: 8px;">
            <strong>Available endpoints:</strong>
          </p>
          <div class="endpoint-list">
            <div class="endpoint-item">
              <span class="endpoint-method">GET</span>
              <span class="endpoint-url">/api/health</span>
              <span class="endpoint-desc">Health check</span>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-method">POST</span>
              <span class="endpoint-url">/api/auth/login/request-otp</span>
              <span class="endpoint-desc">Request login OTP</span>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-method">POST</span>
              <span class="endpoint-url">/api/auth/login/verify-otp</span>
              <span class="endpoint-desc">Verify OTP & login</span>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-method">POST</span>
              <span class="endpoint-url">/api/enquiries</span>
              <span class="endpoint-desc">Submit enquiry</span>
            </div>
          </div>
        </div>
        <div class="footer">
          🚀 Built with <a href="#">Node.js + Express + MongoDB</a> &nbsp;|&nbsp; © 2025 SK Group
        </div>
      </div>
    </body>
    </html>
  `);
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'SK Group Backend is running' });
});

// HTTPS / HTTP setup
let server;
const sslKeyPath = process.env.SSL_KEY || './certs/key.pem';
const sslCertPath = process.env.SSL_CERT || './certs/cert.pem';

if (fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
  const options = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
  };
  server = https.createServer(options, app);
} else {
  console.warn('⚠️ SSL certificates not found. Falling back to HTTP.');
  server = require('http').createServer(app);
}

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'https://localhost:3000',
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

server.listen(PORT, '0.0.0.0', () => {
  const protocol = server instanceof https.Server ? 'HTTPS' : 'HTTP';
  console.log(`🚀 Server running on ${protocol}://localhost:${PORT}`);
  console.log(`📡 Socket.IO is ready`);
});