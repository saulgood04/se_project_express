const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl, imageURL } = req.body;


  const imageURLValue = imageURL || imageUrl;

  ClothingItem.create({ name, weather, imageURL: imageURLValue })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: "error from createItem", e });
      } else {
        res.status(500).send({ message: "error from createItem", e });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
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
    res.status(400).send({ message: "Error from updateItem", e });
  } else if (e.name === 'DocumentNotFoundError') {
    res.status(404).send({ message: "Error from updateItem", e });
  } else {
    res.status(500).send({ message: "Error from updateItem", e });
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
    res.status(400).send({ message: "Error from deleteItem", e });
  } else if (e.name === 'DocumentNotFoundError') {
    res.status(404).send({ message: "Error from deleteItem", e });
  } else {
    res.status(500).send({ message: "Error from deleteItem", e });
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
    res.status(400).send({ message: "Error from likeItem", e });
  } else if (e.name === 'DocumentNotFoundError') {
    res.status(404).send({ message: "Error from likeItem", e });
  } else {
    res.status(500).send({ message: "Error from likeItem", e });
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
    res.status(400).send({ message: "Error from dislikeItem", e });
  } else if (e.name === 'DocumentNotFoundError') {
    res.status(404).send({ message: "Error from dislikeItem", e });
  } else {
    res.status(500).send({ message: "Error from dislikeItem", e });
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
