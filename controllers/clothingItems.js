const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl, imageURL } = req.body;


  const imageURLValue = imageURL || imageUrl;

  ClothingItem.create({ name, weather, imageURL: imageURLValue })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: e.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } }, { new: true })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
  if (e.name === 'CastError') {
    res.status(BAD_REQUEST).send({  message: "Invalid item ID" });
  } else if (e.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({ message: "Item not found" });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
  }
});
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({}))
    .catch((e) => {
  if (e.name === 'CastError') {
    res.status(BAD_REQUEST).send({message: "Invalid item ID" });
  } else if (e.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({ message: "Item not found" });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
  }
});
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
  if (e.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
  } else if (e.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({message: "Item not found" });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
  }
});
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
  if (e.name === 'CastError') {
    res.status(BAD_REQUEST).send({message: "Invalid item ID" });
  } else if (e.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({ message: "Item not found" });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({message: "An error has occurred on the server" });
  }
});
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
