const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

const users = []; // temporal
const SECRET = "SUPER_SECRET_KEY";

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    email,
    password: hashedPassword,
  };

  users.push(user);

  res.json({ message: "Usuario creado" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Password incorrecta" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;