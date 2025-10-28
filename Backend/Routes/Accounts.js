import express from "express";
import Account from "../Models/Account.js";

const router = express.Router();

// ---------------- Signup ----------------
router.post("/signup", async (req, res) => {
  const { Name, Email, Password, Role } = req.body;

  try {
    const existing = await Account.findOne({ Email });
    if (existing)
      return res.status(400).json({ message: "Email already exists!" });

    const account = new Account({ Name, Email, Password, Role });
    await account.save();

    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------------- Signin ----------------
router.post("/signin", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const account = await Account.findOne({ Email });
    if (!account)
      return res.status(400).json({ message: "Invalid Email or Password!" });

    const isMatch = await account.matchPassword(Password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Email or Password!" });

    res
      .status(200)
      .json({ message: "Signin successful!", accountId: account._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
