const express = require("express");
const router = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

let users = [];

// REGISTER
router.post("/register", async (req, res) => {
  let { email, password } = req.body;

  logger.info(`Register attempt: ${email}`);

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
});

// LOGIN
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  logger.info(`Login attempt: ${email}`);

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
});

module.exports = router;