const express = require("express");
const {
  createEvent,
  getEventsByUserId,
} = require("../controllers/eventController");

const router = express.Router();

router.post("/", createEvent);
router.get("/:userId", getEventsByUserId);

module.exports = router;