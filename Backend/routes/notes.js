const express = require("express");
const notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route:1 fetch all notes    login req.    /api/notes/fetchall
router.get("/fetchall", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    let usernotes = await notes.find({ user: userid });
    res.send(usernotes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Route:2 add a note   login required    /api/notes/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title must be 3 atleast characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newnote = new notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await newnote.save();
      res.send(savenote);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Route:3   update a note using put   login required    /api/notes/addnote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //creating updated note
    let updatednote = {};
    if (title) {
      updatednote.title = title;
    }
    if (description) {
      updatednote.description = description;
    }
    if (tag) {
      updatednote.tag = tag;
    }

    //checking whether note exist
    let note = await notes.findById( req.params.id)
    if(!note){
      return res.status(404).json({error:"not found"})
    }

    //authenticating that note is of same user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }
    let savednotes= await notes.findByIdAndUpdate(req.params.id,{$set:updatednote},{new:true})
    res.json({savednotes})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Route:4   deleting an existing note using delete   login required    /api/notes/addnote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {

    //checking whether note exists

    let note = await notes.findById( req.params.id)
    if(!note){
      return res.status(404).json({error:"not found"})
    }

    //authenticating that note is of same user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }

    let deletednote= await notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Deleted Note Successfully",note})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
