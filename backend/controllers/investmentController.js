const asyncHandler = require("express-async-handler");

const Investment = require("../models/investmentModel");
const Action = require("../models/actionModel")
const User = require("../models/userModel");

const getInvestments = asyncHandler(async (req, res) => {
  const investments = await Investment.find({ user: req.user.id }).populate("actions");
  res.status(200).json({ investments });
});

const createInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.create({
    user: req.user.id,
    name: req.body.name,
    description: req.body.description,
    ref: req.body.ref,
    actions: req.body.actions,
  });
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name at lease");
  }
  res.status(200).json({ investment });
});

const updateInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id);
  if (!investment) {
    res.status(400);
    throw new Error("Investment not found");
  }

  if(!req.user){
      res.status(401)
      throw new Error('User not found')
  }

  if(investment.user.toString() !== req.user.id){
      res.status(401)
      throw new Error('User not authorized')
  }

  const updatedInvestment = await Investment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedInvestment);
});

const deleteInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id);
  if (!investment) {
    res.status(400);
    throw new Error("Investment not found");
  }

  if(!req.user){
      res.status(401)
      throw new Error('User not found')
  }

  if(investment.user.toString() !== req.user.id){
      res.status(401)
      throw new Error('User not authorized')
  }
  await Action.deleteMany({investment: req.params.id})

  await investment.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment,
};
