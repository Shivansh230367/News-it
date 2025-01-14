const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware.js");
const { saveBody, updateBody } = require("../validation/notes.js");
const Notes = require("../models/notes.model.js");

router.post("/save", authMiddleware, async (req, res) => {
  const postPayload = req.body;
  const { success } = saveBody.safeParse(postPayload);
  if (!success || !postPayload)
    return res.status(411).json({ message: "Invalid Input" });
  const note = await Notes.create({
    userId: req.userId,
    title: postPayload.title,
    details: postPayload.details,
  });
  return res
    .status(200)
    .json({ message: `Note ${note.title} saved successfully` });
});

router.put("/:id", authMiddleware, async(req, res)=>{
  const {id} = req.params;
  const putPayload = req.body;
  const {success} = updateBody.safeParse(putPayload);
  if(!success || !putPayload)
    return res.status(411).json({ message: "Invalid Input" });
  await Notes.updateOne({userId: req.userId, _id: id.toString()}, {$set: {...putPayload}});
  return res.status(200).json({ message: "Notes updated" });
})

router.delete("/remove/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(411).json({ message: "Invalid Input" });
  await Notes.deleteOne({
    userId: req.userId,
    _id: id.toString(),
  });
  return res.status(200).json({ message: "Note removed" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const notes = await Notes.find({
    $and: [
      {
        userId: req.userId,
      },
      {
        title: {
          $regex: filter,
        },
      },
    ],
  });
  return res.status(200).json({
    notes: notes.map((note) => ({
      title: note.title,
      details: note.details,
      _id: note._id,
    })),
  });
});

module.exports = router;
