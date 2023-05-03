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
/**
 * ROUTES
 */
// Create
app.post('/brags', async (req, res) => {
	try {
		// const user_id = req.body.user_id;
		const user_id = 815138;
		const title = req.body.title;
		const brag = req.body.brag;
		const tags = ['php', 'react'];
		const newBrag = await pool.query('INSERT INTO brags (user_id, title, brag, tags) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, title, brag, tags]);

		res.json(newBrag.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// Get all
app.get('/brags', async (req, res) => {
	try {
		const allBrags = await pool.query('SELECT * FROM brags');
		res.json(allBrags.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
