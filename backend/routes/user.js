const express = require("express");
const { signupBody, signinBody, updateBody } = require("../validation/user");
const User = require("../models/user.model.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const { authMiddleware } = require("../middleware.js");
const passport = require("../auth/google");

router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  session: false
}), (req, res) => {
  res.json({ token: req.user.token });
});
router.post("/signup", async (req, res) => {
  const postPayload = req.body;
  const { success } = signupBody.safeParse(postPayload);
  if (!success || !postPayload)
    return res.status(411).json({ message: "Invalid Input" });
  const existingUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (existingUser)
    return res.status(411).json({ message: "User already exists" });
  const user = await User.create({
    firstname: postPayload.firstname,
    lastname: postPayload.lastname,
    email: postPayload.email,
    password: postPayload.password,
    age: postPayload.age,
    country: postPayload.country,
    interest: postPayload.interest,
  });
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  return res
    .status(200)
    .json({
      message: "User successfully created",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        age: user.age,
        country: user.country,
        interest: user.interest,
      },
      token,
    });
});

router.post("/signin", async (req, res) => {
  const postPayload = req.body;
  const { success } = signinBody.safeParse(postPayload);
  if (!success || !postPayload)
    return res.status(411).json({ message: "Invalid Login Credentials" });
  const user = await User.findOne({
    email: postPayload.email,
    password: postPayload.password,
  });
  if (!user) return res.status(411).json({ message: "User does not exist" });
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      age: user.age,
      country: user.country,
      interest: user.interest,
    },
    token,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const putPayload = req.body;
  const { success } = updateBody.safeParse(putPayload);
  if (!putPayload || !success)
    return res.status(411).json({ message: "Invalid Inputs" });
  await User.updateOne({ _id: req.userId }, { $set: { ...putPayload } });
  const user = await User.findOne({ _id: req.userId });
  return res.status(200).json({ message: "User updated successfully", user: {
  "_id": user._id,
  "firstname": user.firstname,
  "lastname": user.lastname,
  "email": user.email,
  "age": user.age,
  "country": user.country,
  "interest": user.interest,
  }});
});

module.exports = router;
