const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5001;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Or allow multiple origins
const allowedOrigins = ['http://localhost:3000', 'https://your-koyeb-app.koyeb.app'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

//Available Routes
app.use("/api/repair", require("./routes/repair"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/blog", require("./routes/blog"));

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});