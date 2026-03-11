const pool = require("../db");

async function getRecommendations(userId) {

  // 1 Find the most viewed  category by users
  const categoryQuery = `
    SELECT p.category_id, COUNT(*) AS view_count
    FROM user_events e
    JOIN products p
      ON e.product_id = p.product_id
    WHERE e.user_id = $1
      AND e.event_type = 'product_view'
    GROUP BY p.category_id
    ORDER BY view_count DESC
    LIMIT 1
  `;

  const categoryResult = await pool.query(categoryQuery, [userId]);

  // If the user has browsing history
  if (categoryResult.rows.length > 0) {

    const categoryId = categoryResult.rows[0].category_id;

    const recommendationQuery = `
      SELECT
        p.product_id,
        p.product_name,
        p.price,
        p.description,
        p.image_url,
        c.category_name
      FROM products p
      JOIN categories c
        ON p.category_id = c.category_id
      WHERE p.category_id = $1
      LIMIT 6
    `;

    const result = await pool.query(recommendationQuery, [categoryId]);

    return result.rows;
  }

  // If you have no browsing history -> Recommend popular products
  const popularQuery = `
    SELECT
      p.product_id,
      p.product_name,
      p.price,
      p.description,
      p.image_url,
      c.category_name,
      COUNT(e.event_id) AS views
    FROM products p
    LEFT JOIN user_events e
      ON p.product_id = e.product_id
    JOIN categories c
      ON p.category_id = c.category_id
    GROUP BY p.product_id, c.category_name
    ORDER BY views DESC
    LIMIT 6
  `;

  const result = await pool.query(popularQuery);

  return result.rows;
}

module.exports = {
  getRecommendations

};
