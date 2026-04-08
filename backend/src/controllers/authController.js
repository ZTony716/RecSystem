const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

function buildAuthResponse(user, token) {
  return {
    success: true,
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await pool.query(
      `
      SELECT user_id, username, email, password_hash, role
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    let isMatch = false;
    const stored = user.password_hash || "";

    // 兼容旧数据：如果以前存的是明文，先允许登录，再自动升级成 bcrypt
    if (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")) {
      isMatch = await bcrypt.compare(password, stored);
    } else {
      isMatch = stored === password;

      if (isMatch) {
        const newHash = await bcrypt.hash(password, 10);
        await pool.query(
          `
          UPDATE users
          SET password_hash = $1
          WHERE user_id = $2
          `,
          [newHash, user.user_id]
        );
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json(buildAuthResponse(user, token));
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await pool.query(
      `
      SELECT user_id
      FROM users
      WHERE email = $1 OR username = $2
      `,
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const insertResult = await pool.query(
      `
      INSERT INTO users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, username, email, role
      `,
      [username, email, passwordHash, "user"]
    );

    const user = insertResult.rows[0];

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json(buildAuthResponse(user, token));
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Register failed",
    });
  }
};

module.exports = {
  login,
  register,
};