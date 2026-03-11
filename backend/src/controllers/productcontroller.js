const pool = require("../db");

// GET Porducts information
const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.product_id,
        p.product_name,
        p.price,
        p.description,
        p.image_url,
        p.stock_quantity,
        p.created_at,
        c.category_id,
        c.category_name
      FROM products p
      JOIN categories c
        ON p.category_id = c.category_id
      ORDER BY p.product_id ASC
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// get product detail
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        p.product_id,
        p.product_name,
        p.price,
        p.description,
        p.image_url,
        p.stock_quantity,
        p.created_at,
        c.category_id,
        c.category_name
      FROM products p
      JOIN categories c
        ON p.category_id = c.category_id
      WHERE p.product_id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching product by id:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// search products
const searchProducts = async (req, res) => {
  const { q } = req.query;

  try {
    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const result = await pool.query(
      `
      SELECT 
        p.product_id,
        p.product_name,
        p.price,
        p.description,
        p.image_url,
        p.stock_quantity,
        p.created_at,
        c.category_id,
        c.category_name
      FROM products p
      JOIN categories c
        ON p.category_id = c.category_id
      WHERE 
        p.product_name ILIKE $1
        OR p.description ILIKE $1
        OR c.category_name ILIKE $1
      ORDER BY p.product_id ASC
      `,
      [`%${q}%`]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error searching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to search products",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,

};

