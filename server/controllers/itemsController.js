const Item = require("../models/itemsModel");

const verify_jwt = (jwt) => {};

/* GET request handler */
const getItem = async (req, res) => {
  const items = await Item.find();
  res.status(201).json(items);
};

/* GET request handler */
const getItemById = async (req, res) => {
  Item.findOne({ _id: req.params.id })
    .then((item) => {
      console.log(item);
      res.status(201).json(item);
    })
    .catch((err) => {
      res.status(404).json({ error: "There is No Item" });
    });
};

/* POST Request handler */
const addItem = async (req, res) => {
  const highlights = req.body.highlights.split(",");
  const size = req.body.size.split(",");

  /* The request.body must have all these values */
  const item = {
    name: req.body.name,
    category: req.body.category,
    type: req.body.type,
    color: req.body.color,
    description: req.body.description,
    price: req.body.price,
    image: req.files,
    size: size,
    highlights: highlights,
    detail: req.body.detail,
  };

  if (item) {
    await Item.create(item);
    res.status(201).json({ message: "Items Add Success" });
    res.redirect("/shop");
  } else {
    res.status(400).json({ message: "Unable to add item" });
  }
};

/* PUT Request handler */
const updateItem = (req, res) => {
  res.json({ message: "update Item" });
};

/* DELETE Request handler */
const deleteItem = (req, res) => {
  res.json({ message: "delete Item" });
};

module.exports = {
  getItem,
  addItem,
  updateItem,
  deleteItem,
  getItemById,
};
