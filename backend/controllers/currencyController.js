const asyncHandler = require("express-async-handler");

const Currency = require("../models/currencyModel");

const getCurrencies = asyncHandler(async (req, res) => {
  const currencies = await Currency.find({}).populate("investments");
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

  if (req.body.investments) {
    res.status(400);
    throw new Error("Cannot change the investments asociated to a currency");
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

  if (req.body.investments) {
    res.status(400);
    throw new Error("Cannot change the investments asociated to a currency");
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

  if (currency.investments && currency.investments.length > 0) {
    res.status(400);
    throw new Error("Cannot delete a currency with connected investments");
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
