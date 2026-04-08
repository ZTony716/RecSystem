const pool = require("../db");

/**
 * Personalized recommendations for a user
 * Return frontend-friendly old format:
 * id, name, desc, price, category
 */
async function getUserRecommendations(userId) {
  const categoryQuery = `
    SELECT
      p.category_id,
      c.category_name,
      SUM(
        (
          CASE
            WHEN e.event_type = 'product_view' THEN 1
            WHEN e.event_type = 'add_to_cart' THEN 3
            WHEN e.event_type = 'purchase_intent' THEN 5
            ELSE 0
          END
        ) *
        (
          CASE
            WHEN e.event_time >= NOW() - INTERVAL '7 days' THEN 1.0
            WHEN e.event_time >= NOW() - INTERVAL '30 days' THEN 0.7
            ELSE 0.4
          END
        )
      ) AS preference_score
    FROM user_events e
    JOIN products p
      ON e.product_id = p.product_id
    JOIN categories c
      ON p.category_id = c.category_id
    WHERE e.user_id = $1
      AND e.event_type IN ('product_view', 'add_to_cart', 'purchase_intent')
    GROUP BY p.category_id, c.category_name
    ORDER BY preference_score DESC, p.category_id ASC
    LIMIT 2
  `;

  const categoryResult = await pool.query(categoryQuery, [userId]);

  if (categoryResult.rows.length === 0) {
    return getPopularRecommendations();
  }

  const categoryIds = categoryResult.rows.map(row => row.category_id);

  const recommendationQuery = `
    SELECT
      p.product_id AS id,
      p.product_name AS name,
      p.description AS desc,
      p.price,
      c.category_name AS category,

      COUNT(e.event_id) FILTER (WHERE e.event_type = 'product_view') AS views,
      COUNT(e.event_id) FILTER (WHERE e.event_type = 'add_to_cart') AS cart_adds,
      COUNT(e.event_id) FILTER (WHERE e.event_type = 'purchase_intent') AS purchase_intents,

      (
        COUNT(e.event_id) FILTER (WHERE e.event_type = 'product_view') * 1 +
        COUNT(e.event_id) FILTER (WHERE e.event_type = 'add_to_cart') * 3 +
        COUNT(e.event_id) FILTER (WHERE e.event_type = 'purchase_intent') * 5
      ) AS weighted_score,

      CASE
        WHEN p.category_id = $1 THEN 2
        WHEN p.category_id = $2 THEN 1
        ELSE 0
      END AS category_boost

    FROM products p
    JOIN categories c
      ON p.category_id = c.category_id
    LEFT JOIN user_events e
      ON p.product_id = e.product_id
    WHERE p.category_id IN ($1, $2)
      AND p.product_id NOT IN (
        SELECT product_id
        FROM user_events
        WHERE user_id = $3
          AND event_type IN ('product_view', 'add_to_cart', 'purchase_intent')
          AND product_id IS NOT NULL
      )
    GROUP BY
      p.product_id,
      p.product_name,
      p.description,
      p.price,
      p.category_id,
      c.category_name
    ORDER BY category_boost DESC, weighted_score DESC, p.product_id DESC
    LIMIT 6
  `;

  const firstCategoryId = categoryIds[0];
  const secondCategoryId = categoryIds[1] || categoryIds[0];

  const result = await pool.query(recommendationQuery, [
    firstCategoryId,
    secondCategoryId,
    userId
  ]);

  if (result.rows.length > 0) {
    return result.rows;
  }

  return getPopularRecommendations();
}
/**
 * Popular recommendations
 * Return old frontend format
 */
async function getPopularRecommendations() {
  const popularQuery = `
    SELECT
      p.product_id AS id,
      p.product_name AS name,
      p.description AS desc,
      p.price,
      c.category_name AS category,

      COUNT(e.event_id) FILTER (WHERE e.event_type = 'product_view') AS views,
      COUNT(e.event_id) FILTER (WHERE e.event_type = 'add_to_cart') AS cart_adds,
      COUNT(e.event_id) FILTER (WHERE e.event_type = 'purchase_intent') AS purchase_intents,

      (
        COUNT(e.event_id) FILTER (WHERE e.event_type = 'product_view') * 1 +
        COUNT(e.event_id) FILTER (WHERE e.event_type = 'add_to_cart') * 3 +
        COUNT(e.event_id) FILTER (WHERE e.event_type = 'purchase_intent') * 5
      ) AS weighted_score

    FROM products p
    JOIN categories c
      ON p.category_id = c.category_id
    LEFT JOIN user_events e
      ON p.product_id = e.product_id
    GROUP BY
      p.product_id,
      p.product_name,
      p.description,
      p.price,
      c.category_name
    ORDER BY weighted_score DESC, views DESC, p.product_id DESC
    LIMIT 6
  `;

  const result = await pool.query(popularQuery);
  return result.rows;
}

/**
 * Similar product recommendations
 * Same category + closest price
 * Return old frontend format
 */
async function getSimilarRecommendations(productId) {
  const productQuery = `
    SELECT product_id, category_id, price
    FROM products
    WHERE product_id = $1
  `;

  const productResult = await pool.query(productQuery, [productId]);

  if (productResult.rows.length === 0) {
    return [];
  }

  const { category_id, price } = productResult.rows[0];

  const similarQuery = `
    SELECT
      p.product_id AS id,
      p.product_name AS name,
      p.description AS desc,
      p.price,
      c.category_name AS category,
      ABS(p.price - $3) AS price_diff,
      COUNT(e.event_id) FILTER (WHERE e.event_type = 'product_view') AS views
    FROM products p
    JOIN categories c
      ON p.category_id = c.category_id
    LEFT JOIN user_events e
      ON p.product_id = e.product_id
    WHERE p.category_id = $1
      AND p.product_id != $2
    GROUP BY
      p.product_id,
      p.product_name,
      p.description,
      p.price,
      c.category_name
    ORDER BY price_diff ASC, views DESC, p.product_id DESC
    LIMIT 6
  `;

  const result = await pool.query(similarQuery, [category_id, productId, price]);
  return result.rows;
}

async function getAlsoViewedRecommendations(productId) {
  const alsoViewedQuery = `
    SELECT
      p.product_id AS id,
      p.product_name AS name,
      p.description AS desc,
      p.price,
      c.category_name AS category,
      COUNT(*) AS co_view_count
    FROM user_events target
    JOIN user_events other
      ON target.user_id = other.user_id
    JOIN products p
      ON other.product_id = p.product_id
    JOIN categories c
      ON p.category_id = c.category_id
    WHERE target.product_id = $1
      AND target.event_type = 'product_view'
      AND other.event_type = 'product_view'
      AND other.product_id IS NOT NULL
      AND other.product_id != $1
    GROUP BY
      p.product_id,
      p.product_name,
      p.description,
      p.price,
      c.category_name
    ORDER BY co_view_count DESC, p.product_id DESC
    LIMIT 6
  `;

  
