const {
  saveEvent,
  fetchEventsByUserId,
} = require("../services/eventService");

const createEvent = async (req, res) => {
  const { user_id, product_id, event_type, event_value } = req.body;

  try {
    if (!user_id || !event_type) {
      return res.status(400).json({
        success: false,
        message: "user_id and event_type are required",
      });
    }

    const event = await saveEvent({
      user_id,
      product_id,
      event_type,
      event_value,
    });

    res.status(201).json({
      success: true,
      message: "Event recorded successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to record event",
    });
  }
};

const getEventsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await fetchEventsByUserId(userId);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching user events:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

module.exports = {
  createEvent,
  getEventsByUserId,
};
