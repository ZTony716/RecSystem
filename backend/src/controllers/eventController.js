const pool = require("../db");

// 记录用户行为
const createEvent = async (req, res) => {
  const { user_id, product_id, event_type, event_value } = req.body;

  try {
    if (!user_id || !event_type) {
      return res.status(400).json({
        success: false,
        message: "user_id and event_type are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO user_events (user_id, product_id, event_type, event_value)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [user_id, product_id || null, event_type, event_value || null]
    );

    res.status(201).json({
      success: true,
      message: "Event recorded successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to record event",
    });
  }
};

// 获取某个用户的行为记录
const getEventsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT *
      FROM user_events
      WHERE user_id = $1
      ORDER BY event_time DESC
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
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