const asyncHandler = require("express-async-handler");

const Currency = require("../models/currencyModel");
const User = require("../models/userModel");
const Investment = require("../models/investmentModel");

const getCurrencies = asyncHandler(async (req, res) => {
  const currencies = await Currency.find({});
  res.status(200).json({ currencies });
});

const createCurrency = asyncHandler(async (req, res) => {

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name at lease");
  }
  
  const currency = await Currency.create({
    name: req.body.name,
  });
  res.status(200).json({ currency });
});

const updateCurrency = asyncHandler(async (req, res) => {

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  const currency = await Currency.findById(req.params.id);
  if (!currency) {
    res.status(400);
    throw new Error("currency not found");
  }

  const updatedCurrency = await Currency.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCurrency);
});

const deleteCurrency = asyncHandler(async (req, res) => {

  if (req.user.role !== 'Admin') {
    res.status(401)
    throw new Error('User not authorized')
  }

  const currency = await Currency.findById(req.params.id);
  if (!currency) {
    res.status(400);
    throw new Error("currency not found");
  }

  const investment = await Investment.find({currency: currency._id})

  if (investment.length > 0) {
    res.status(400);
    throw new Error("You cannot delete a currency with investments");
  }

  const user = await User.find({currency: currency._id})

  if (user.length > 0) {
    res.status(400);
    throw new Error("You cannot delete a currency with users");
  }

  await currency.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCurrencies,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
