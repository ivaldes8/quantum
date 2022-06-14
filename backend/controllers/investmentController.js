const asyncHandler = require("express-async-handler");

const Investment = require("../models/investmentModel");
const Action = require("../models/actionModel");
const Currency = require("../models/currencyModel");
const User = require("../models/userModel");

const getInvestments = asyncHandler(async (req, res) => {
  const investments = await Investment.find({ user: req.user.id }).populate("actions").populate("currency");
  res.status(200).json({ investments });
});

const createInvestment = asyncHandler(async (req, res) => {

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  if(!req.body.currency){
    res.status(400);
    throw new Error("Please select a currency");
  }

  const currency = await Currency.findById(req.body.currency);

  if (!currency) {
    res.status(400);
    throw new Error("Currency not found");
  }


  const sotageInvestment = await Investment.create({
    user: req.user.id,
    currency: req.body.currency,
    name: req.body.name,
    description: req.body.description,
    ref: req.body.ref,
    actions: req.body.actions,
  });

  const investment = await Investment.findById(sotageInvestment._id).populate("currency");

  const currencyInvestments = currency.investments

  currencyInvestments.push(investment._id)
  
  await Currency.findByIdAndUpdate(currency._id, {investments: currencyInvestments}, {
    new: true,
  });

  res.status(200).json({ investment });
});

const updateInvestment = asyncHandler(async (req, res) => {
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

  if(req.body.currency){
    res.status(400);
    throw new Error("Cannot change the currency of this investment once created");
  }

  const updatedInvestment = await Investment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("currency");
  res.status(200).json(updatedInvestment);
});

const deleteInvestment = asyncHandler(async (req, res) => {
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

  const currency = await Currency.findById(investment.currency);

  if (!currency) {
    res.status(400);
    throw new Error("Currency not found");
  }

  const currencyInvestments = currency.investments.filter((i) => i.toString() !== investment._id.toString())
  
  await Currency.findByIdAndUpdate(currency._id, {investments: currencyInvestments}, {
    new: true,
  });

  await Action.deleteMany({ investment: req.params.id })

  await investment.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment,
};
