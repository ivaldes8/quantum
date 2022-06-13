const asyncHandler = require("express-async-handler");

const Action = require("../models/actionModel");
const Investment = require("../models/investmentModel");
const User = require("../models/userModel");

const getActions = asyncHandler(async (req, res) => {
  const actions = await Action.find({ investment: req.params.id, user: req.user.id }).populate("investment");
  res.status(200).json({ actions });
});

const createAction = asyncHandler(async (req, res) => {

  if (!req.params.id) {
    res.status(400);
    throw new Error("Please add a Investment");
  }
  if (!req.body.date) {
    res.status(400);
    throw new Error("Please add a date at lease");
  }

  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    res.status(400);
    throw new Error("Investment not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (investment.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const action = await Action.create({
    investment: req.params.id,
    user: req.user.id,
    amount: req.body.amount,
    feedback: req.body.feedback,
    reason: req.body.reason,
    date: req.body.date
  });

  const investmentActions = investment.actions

  investmentActions.push(action._id)
  
  await Investment.findByIdAndUpdate(req.params.id, {actions: investmentActions}, {
    new: true,
  });
  res.status(200).json({ action });
});

const updateAction = asyncHandler(async (req, res) => {
  const action = await Action.findById(req.params.id);
  if (!action) {
    res.status(400);
    throw new Error("action not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (action.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedAction = await Action.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedAction);
});

const deleteAction = asyncHandler(async (req, res) => {
  const action = await Action.findById(req.params.id);
  if (!action) {
    res.status(400);
    throw new Error("action not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (action.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const investment = await Investment.findById(action.investment);

  if (!investment) {
    res.status(400);
    throw new Error("Investment not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (investment.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const investmentActions = investment.actions.filter((a) => a.toString() !== action._id.toString())
   
  await Investment.findByIdAndUpdate(investment._id, {actions: investmentActions}, {
    new: true,
  });

  await action.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getActions,
  createAction,
  updateAction,
  deleteAction,
};
