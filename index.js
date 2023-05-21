require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./client/build"));

/**
 * ROUTES
 */
// Create
app.post("/brags", async (req, res) => {
	try {
		const date = req.body.currentDate;
		const time = req.body.currentTime;
		const email = req.body.userEmail;
		const brag = req.body.brag;
		const tags = req.body.tags.split(",");

		if (brag !== "") {
			const newBrag = await pool.query("INSERT INTO brags (created_date, created_time, user_email, brag, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *", [date, time, email, brag, tags]);
			res.json(newBrag.rows[0]);
		}
	} catch (err) {
		console.error(err.message);
	}
});

// Read
app.get("/brags", async (req, res) => {
	try {
		const email = req.query.userEmail;
		const allBrags = await pool.query("SELECT * FROM brags WHERE user_email = $1 ORDER BY created_date DESC, created_time DESC", [email]);
		res.json(allBrags.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// Search
app.get("/search", async (req, res) => {
	try {
		const email = req.query.useremail;
		const search = req.query.searchstring;

		// Add wildcards around the search parameter
		const searchPattern = `%${search}%`;

		const allBrags = await pool.query("SELECT * FROM brags WHERE user_email = $1 AND brag ILIKE $2 ORDER BY created_date DESC, created_time DESC", [email, searchPattern]);
		res.json(allBrags.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// Update
app.put("/brags/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const brag = req.body.brag;
		let tags = req.body.tags;

		if (tags.length === 1) {
			tags = req.body.tags;
		} else if (tags.length > 1) {
			tags = req.body.tags.split(",");
		} else {
			tags = [];
		}

		await pool.query("UPDATE brags SET brag = $1, tags = $2 WHERE brag_id = $3", [brag, tags, id]);

		res.json("Brag was updated!");
	} catch (err) {
		console.error(err.message);
	}
});

// Delete
app.delete("/brags/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query("DELETE FROM brags WHERE brag_id = $1", [id]);

		res.json("Record deleted");
	} catch (err) {
		console.error(err.message);
	}
});

// Added 0.0.0.0 for railway deployment
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
