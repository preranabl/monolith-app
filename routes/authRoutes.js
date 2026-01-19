const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Handle login form submission (we'll treat it like signup for now)
router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If not, create a new user
      user = new User({ name, email, password });
      await user.save();
      console.log("New user created:", user);
    } else {
      console.log("User exists, logging in:", user);
    }

    res.send(`<h2>Welcome, ${user.name}!</h2><a href="/payment.html">Go to Payment</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
