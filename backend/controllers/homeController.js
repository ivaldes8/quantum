const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Home = require("../models/homeModel ");

const getHome = asyncHandler(async (req, res) => {
  
  const home = await Home.find({}).populate("cards")

  res.status(200).json({ home });
});

const createHome = asyncHandler(async (req, res) => {

  if (!req.body.aboutTitle) {
    res.status(400);
    throw new Error("Please add a about title");
  }

  if (!req.body.fraseTitle) {
    res.status(400);
    throw new Error("Please add a frase title");
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  if (!req.body.email) {
    res.status(400);
    throw new Error("Please add a email");
  }

  if (!req.body.cards) {
    res.status(400);
    throw new Error("Please add a card");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  const storageHome = await Home.create({
    aboutTitle: req.body.aboutTitle,
    aboutDescription: req.body.aboutDescription,
    fraseTitle: req.body.fraseTitle,
    fraseDescription: req.body.fraseDescription,
    name: req.body.name,
    portafolio: req.body.portafolio,
    email: req.body.email,
    cards: req.body.cards
  });

  const home = await Home.findById(storageHome._id).populate("cards");

  res.status(200).json({ home });
});

const updateHome = asyncHandler(async (req, res) => {
  const home = await Home.findById(req.params.id);
  if (!home) {
    res.status(400);
    throw new Error("home not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("cards");

  res.status(200).json(updatedHome);
});

const deleteHome = asyncHandler(async (req, res) => {
  const home = await Home.findById(req.params.id);
  if (!home) {
    res.status(400);
    throw new Error("home not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  await home.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getHome,
  createHome,
  updateHome,
  deleteHome,
};
