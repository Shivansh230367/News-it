const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const bookmarkRouter = require("./bookmark.js");
const notesRouter = require("./notes.js");

router.use("/user", userRouter);
router.use("/bookmarks", bookmarkRouter);
router.use("/notes", notesRouter);

module.exports = router;