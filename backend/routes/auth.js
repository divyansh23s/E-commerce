const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      if (!isUserExist.password) {
        return res
          .status(400)
          .send("An account exists for this email but has no password. Use another email or repair this test account in MongoDB.");
      }
      return res.status(400).send("user exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    await user.save();
    res.status(200).send({ user: user._id });
  } catch (error) {
    console.error("Registration failed:", error.message);
    res.status(500).send("Unable to register right now.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const isUserExist = await User.findOne({ email: req.body.email });
    if (!isUserExist) {
      return res.status(400).send({ msg: "user does not exist" });
    }

    if (typeof isUserExist.password !== "string" || !isUserExist.password) {
      return res
        .status(400)
        .send("This account has no password set. Use another email or repair this test account in MongoDB.");
    }

    const validPass = await bcrypt.compare(
      req.body.password,
      isUserExist.password
    );
    if (!validPass) {
      return res.status(400).send("email or password wrong");
    }

    if (!process.env.SECRET_KEY) {
      console.error("Login failed: SECRET_KEY is not configured.");
      return res.status(500).send("Server authentication is not configured.");
    }

    const token = jwt.sign({ _id: isUserExist._id }, process.env.SECRET_KEY);
    const safeUser = {
      _id: isUserExist._id,
      name: isUserExist.name,
      email: isUserExist.email,
    };
    return res.header("auth-token", token).send({ token, user: safeUser });
  } catch (error) {
    console.error("Login failed:", error.message);
    return res.status(500).send("Unable to log in right now.");
  }
});
module.exports = router;
