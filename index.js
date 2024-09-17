const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to MongoDB using Mongoose
// mongoose.connect("mongodb://localhost:27017/BragDoc", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb://localhost:27017/BragDoc");

app.use(cors({
  origin: 'http://localhost:3000', // allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allow these methods
  headers: ['Content-Type', 'Authorization'] // allow these headers
}));

// Define the Mongoose model for Brags
const bragSchema = new mongoose.Schema({
  createdDate: Date,
  createdTime: String,
  userEmail: String,
  brag: String,
  tags: [{ type: String }]
});

const Brag = mongoose.model("Brag", bragSchema);

// Middleware
app.use(express.json());
// app.use(express.static("./client/build"));

/**
 * ROUTES
 */
// Create
app.post("/brags", async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
    const currentTime = currentDate.toLocaleTimeString();
    const email = req.body.userEmail;
    const brag = req.body.brag;
    const tags = req.body.tags.split(",");

    if (brag !== "") {
      const newBrag = new Brag({
        createdDate: formattedDate, // Use formattedDate here
        createdTime: currentTime,
        userEmail: email,
        brag: brag,
        tags: tags
      });
      await newBrag.save();

      // Create a shallow copy of the newBrag object and replace createdDate with formattedDate
      const formattedNewBrag = { ...newBrag._doc };
      formattedNewBrag.createdDate = formattedDate; // Ensure createdDate is in YYYY-MM-DD format

      res.json(formattedNewBrag);
    } else {
      res.status(400).json({ message: "Brag content cannot be empty" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Read
app.get("/brags", async (req, res) => {
	try {
	  const email = req.query.userEmail;
	  if (email) {
		const allBrags = await Brag.find({ userEmail: email }).sort({ createdDate: -1, createdTime: -1 });
		res.json(allBrags);
	  } else {
		const allBrags = await Brag.find().sort({ createdDate: -1, createdTime: -1 });
		res.json(allBrags);
	  }
	} catch (err) {
	  console.error(err.message);
	}
  });

  // Search
// app.get("/search", async (req, res) => {
//   try {
//     const email = req.query.userEmail;
//     const search = req.query.searchstring;

//     if (!email) {
//       return res.status(400).json({ error: "User email is required" });
//     }

//     const searchPattern = new RegExp(search, "i");

//     const allBrags = await Brag.find({ userEmail: email, brag: { $regex: searchPattern } }).sort({ createdDate: -1, createdTime: -1 });
//     res.json(allBrags);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
// Search
app.get("/search", async (req, res) => {
  try {
    const email = req.query.userEmail;
    // console.log(req.query);
    const search = req.query.searchstring;

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    if (!search) {
      return res.status(400).json({ error: "Search string is required" });
    }

    const searchPattern = new RegExp(search, "i");

    const allBrags = await Brag.find({ userEmail: email, brag: { $regex: searchPattern } }).sort({ createdDate: -1, createdTime: -1 });
    res.json(allBrags);
  } catch (err) {
    console.error(err.message);
  }
});
// Update
app.put("/brags/:id", async (req, res) => {
	try {
	  const { id } = req.params;
	  const brag = req.body.brag;
	  const tags = req.body.tags ? req.body.tags.split(",") : [];
  
	  await Brag.findByIdAndUpdate(id, { brag: brag, tags: tags }, { new: true });
	  res.json("Brag was updated!");
	} catch (err) {
	  console.error(err.message);
	}
  });

// Delete

app.delete("/brags/:id", async (req, res) => {
	try {
	  const { id } = req.params;
	  const deletedBrag = await Brag.findOneAndDelete({ _id: id });
	  if (!deletedBrag) {
		res.status(404).json({ error: "Brag not found" });
	  } else {
		res.json("Record deleted");
	  }
	} catch (err) {
	  console.error(err.message);
	  res.status(500).json({ error: "Failed to delete brag" });
	}
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});