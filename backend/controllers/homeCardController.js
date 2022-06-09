const asyncHandler = require("express-async-handler");

const HomeCard = require("../models/homeCardModel ");
const User = require("../models/userModel");

const getHomeCards = asyncHandler(async (req, res) => {
  const homeCards = await HomeCard.find({});
  res.status(200).json({ homeCards });
});

const createHomeCard = asyncHandler(async (req, res) => {

  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title");
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error("Please add a description");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  const homeCard = await HomeCard.create({
    title: req.body.title,
    description: req.body.description,
    img: req.body.img
  });

  res.status(200).json({ homeCard });
});

const updateHomeCard = asyncHandler(async (req, res) => {
  const homeCard = await HomeCard.findById(req.params.id);
  if (!homeCard) {
    res.status(400);
    throw new Error("home card not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedHomeCard = await HomeCard.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedHomeCard);
});

const deleteHomeCard = asyncHandler(async (req, res) => {
  const homeCard = await HomeCard.findById(req.params.id);
  if (!homeCard) {
    res.status(400);
    throw new Error("home card not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  await homeCard.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getHomeCards,
  createHomeCard,
  updateHomeCard,
  deleteHomeCard,
};
