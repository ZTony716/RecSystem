const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEventsByUserId,
} = require("../controllers/eventController");

router.post("/", createEvent);
router.get("/:userId", getEventsByUserId);

module.exports = router;
