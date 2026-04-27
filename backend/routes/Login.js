router.post("/login", async (req, res) => {
    let { email, password } = req.body;
  
    email = validator.escape(email);
  
    logger.info(`Login attempt: ${email}`);
  
    const user = users.find((u) => u.email === email);
  
    if (!user) {
      logger.warn(`Login failed (user not found): ${email}`);
      return res.status(400).json({ msg: "User not found" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      logger.warn(`Login failed (wrong password): ${email}`);
      return res.status(400).json({ msg: "Invalid credentials" });
    }
  
    const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
  
    logger.info(`Login success: ${email}`);
  
    res.json({ token });
  });