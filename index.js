require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
app.use(cors());
app.use(express.json());
// app.use(express.static("./client/build"));

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
      const newBrag = new Brag({ createdDate: date, createdTime: time, userEmail: email, brag: brag, tags: tags });
      await newBrag.save();
      res.json(newBrag);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Read
// app.get("/brags", async (req, res) => {
//   try {
//     const email = req.query.userEmail;
//     const allBrags = await Brag.find({ userEmail: email }).sort({ createdDate: -1, createdTime: -1 });
//     res.json(allBrags);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
// app.get("/brags", async (req, res) => {
// 	try {
// 	  const email = req.query.userEmail;
// 	  if (!email) {
// 		return res.status(400).json({ error: "User email is required" });
// 	  }
  
// 	  const allBrags = await Brag.find({ userEmail: email }).sort({ createdDate: -1, createdTime: -1 });
// 	  res.json(allBrags);
// 	} catch (err) {
// 	  console.error(err.message);
// 	}
//   });
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
//     const email = req.query.useremail;
//     const search = req.query.searchstring;

//     const searchPattern = new RegExp(search, "i");

//     const allBrags = await Brag.find({ userEmail: email, brag: { $regex: searchPattern } }).sort({ createdDate: -1, createdTime: -1 });
//     res.json(allBrags);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
app.get("/search", async (req, res) => {
  try {
    const email = req.query.useremail;
    const search = req.query.searchstring;

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    const searchPattern = new RegExp(search, "i");

    const allBrags = await Brag.find({ userEmail: email, brag: { $regex: searchPattern } }).sort({ createdDate: -1, createdTime: -1 });
    res.json(allBrags);
  } catch (err) {
    console.error(err.message);
  }
});
// Update
// app.put("/brags/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const brag = req.body.brag;
//     let tags = req.body.tags;

//     if (tags) {
// 		if (tags.length === 1) {
// 		  tags = [tags];
// 		} else if (tags.length > 1) {
// 		  tags = tags.split(",");
// 		}
// 	  } else {
// 		tags = [];
// 	  }

//     await Brag.findByIdAndUpdate(id, { brag: brag, tags: tags }, { new: true });
//     res.json("Brag was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });
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
// app.delete("/brags/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Brag.findByIdAndRemove(id);
//     res.json("Record deleted");
//   } catch (err) {
//     console.error(err.message);
//   }
// });
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

// Serve React app's index.html for all routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});