const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5001;

// Use only ONE CORS configuration
const allowedOrigins = ['http://localhost:3000', 'https://far-caterina-devtribe-16bbb1ed.koyeb.app'];
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Available Routes
app.use("/api/repair", require("./routes/repair"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/blog", require("./routes/blog"));

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});