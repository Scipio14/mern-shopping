const express = require("express");
const router = express.Router();

//Item model

const Item = require("../../models/Item");

//@route GET api/items
//@desc GET  All items
//@access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});
//@route GET api/items/:id
//@desc GET  item
//@access Public
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).send("Item not found"));
});

//@route POST api/items
//@desc Create a post
//@access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.status(201).json(item));
});

//@route DELETE api/items/:id
//@desc Delete an item
//@access Public
router.delete("/:id", (req, res) => {
  console.log(req.param.id);
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ succes: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
