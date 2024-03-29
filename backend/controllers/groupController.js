const asyncHandler = require("express-async-handler");

const Investment = require("../models/investmentModel");
const Group = require("../models/groupModel")
const User = require("../models/userModel");

const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find({ user: req.user.id }).populate("investments");
  res.status(200).json({ groups });
});

const getGroupById = asyncHandler(async (req, res) => {
  const group = await Group.find({ user: req.user.id, _id: req.params.id }).populate({
    path: 'investments',
    populate: [
      { path: 'actions' },
      { path: 'currency' }
    ]
  });
  res.status(200).json({ group });
});

const createGroup = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name at lease");
  }

  const validInvestment = await Group.find({ investments: { "$in": req.body.investments } })
  if (validInvestment.length > 0) {
    res.status(400);
    throw new Error("One or more investments already belongs to another group");
  }

  const storageGroup = await Group.create({
    user: req.user.id,
    investments: req.body.investments,
    name: req.body.name,
    description: req.body.description
  });

  const group = await Group.findById(storageGroup._id).populate({
    path: 'investments',
    populate: {
      path: 'actions'
    }
  });

  res.status(200).json({ group });
});

const updateGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(400);
    throw new Error("Group not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (group.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const validInvestment = await Group.find({ investments: { "$in": req.body.investments } })
  if (validInvestment.length > 1) {
    res.status(400);
    throw new Error("One or more investments already belongs to another group");
  }

  const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate({
    path: 'investments',
    populate: {
      path: 'actions'
    }
  });
  res.status(200).json(updatedGroup);
});

const deleteGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(400);
    throw new Error("Group not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (group.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await group.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
