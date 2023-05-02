require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
