const express = require("express");
const router = express.Router();

// Handle payment submission
router.post("/process", (req, res) => {
  const { cardNumber, amount } = req.body;
  console.log("Payment Info:", { cardNumber, amount });
  
  res.send("<h2>Payment Successful!</h2>");
});

module.exports = router;
