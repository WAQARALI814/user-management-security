// 1️⃣ IMPORTS
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const helmet = require("helmet");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

// 2️⃣ CREATE APP
const app = express();

// 3️⃣ MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);
      if (isLocalhost) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

const csrfProtection = csurf({ cookie: true });

// 4️⃣ USERS STORAGE
let users = [];

// =======================
// CSRF TOKEN
// =======================
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// =======================
// REGISTER
// =======================
app.post("/api/auth/register", csrfProtection, async (req, res) => {
  try {
    let { email, password } = req.body || {};

    logger.info(`Register attempt: ${email}`);

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    email = validator.escape(email);
    password = validator.escape(password);

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be 6+ chars" });
    }

    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword });

    res.json({ msg: "Registered successfully" });
  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// =======================
// LOGIN
// =======================
app.post("/api/auth/login", csrfProtection, async (req, res) => {
  try {
    let { email, password } = req.body || {};

    logger.info(`Login attempt: ${email}`);

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    email = validator.escape(email);

    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.use((error, req, res, next) => {
  if (error.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ msg: "Invalid CSRF token" });
  }

  return next(error);
});

// =======================
// START SERVER
// =======================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});