const express = require("express");
const { saveBody } = require("../validation/bookmark");
const Bookmark = require("../models/bookmark.model");
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.post("/save", authMiddleware, async (req, res) => {
    const postPayload = req.body;
    const {success} = saveBody.safeParse(postPayload);
    if(!success || !postPayload) return res.status(411).json({ message : "Invalid Input"});
    const bookmark = await Bookmark.create({
        userId: req.userId,
        title: postPayload.title,
        description: postPayload.description,
        source: postPayload.source,
        url: postPayload.url
    });
    return res.status(200).json({ message: `Bookmark "${bookmark.title}" Saved` });
});

router.delete("/remove/:id", authMiddleware, async (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(411).json({ message: "Invalid Id" });
    try{
        await Bookmark.deleteOne({
            userId: req.userId,
            _id: id.toString()
        });
        return res.status(200).json({ message: "Removed Bookmark"});
    }catch(error){
        return res.status(411).json({ error });
    }
    
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const bookmarks = await Bookmark.find({
        $and: [
            {$or:[
                    {
                        source: {
                            $regex: filter,
                        }
                    },
                    {
                        title: {
                            $regex: filter
                        }
                    }
                ]  
            },    
            {
                userId: req.userId,
            }
        ],
    });
    return res.status(200).json({
        bookmark: bookmarks.map((bookmark)=>({
            title: bookmark.title,
            source: bookmark.source,
            url: bookmark.url,
            _id: bookmark._id
        })),
    });
});

module.exports = router;
