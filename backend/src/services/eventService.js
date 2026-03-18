const pool = require("../db");

const saveEvent = async ({ user_id, product_id, event_type, event_value }) => {
  const result = await pool.query(
    `
    INSERT INTO user_events (user_id, product_id, event_type, event_value)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [user_id, product_id || null, event_type, event_value || null]
  );

  return result.rows[0];
};

const fetchEventsByUserId = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM user_events
    WHERE user_id = $1
    ORDER BY event_time DESC
    `,
    [userId]
  );

  return result.rows;
};

module.exports = {
  saveEvent,
  fetchEventsByUserId,
};
