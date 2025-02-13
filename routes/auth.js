const express = require("express");
const { getAllUsers } = require("../services/auth-services");
const router = express.Router();

// register user
router.get("/usersList", getAllUsers);

router.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Resource Not Found",
  });
});

router.use((req, res) => {
  res.status(408).json({
    status: 408,
    message: "Request Timeout - The server took too long to respond",
  });
});

module.exports = router;