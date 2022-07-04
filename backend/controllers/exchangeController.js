const asyncHandler = require("express-async-handler");

const Exchange = require("../models/exchangeModel");
const Investment = require("../models/investmentModel");

const getExchanges = asyncHandler(async (req, res) => {
  const exchanges = await Exchange.find({ user: req.user.id }).populate("currency");
  res.status(200).json({ exchanges });
});

const createExchange = asyncHandler(async (req, res) => {

  if (!req.body.currency || !req.body.change) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (req.user.currency.toString() === req.body.currency) {
    res.status(400);
    throw new Error("Cannot specify an exchange for your default currency");
  }

  const checkRepeatedExchange = await Exchange.find({ currency: req.body.currency })

  if (checkRepeatedExchange.length > 0) {
    res.status(400);
    throw new Error("Only is allowed one exchange per currency");
  }

  const storedExchange = await Exchange.create({
    user: req.user.id,
    change: req.body.change,
    currency: req.body.currency
  });

  const exchange = await Exchange.findById(storedExchange._id).populate("currency");

  res.status(200).json({ exchange });
});

const updateExchange = asyncHandler(async (req, res) => {
  const exchange = await Exchange.findById(req.params.id);
  if (!exchange) {
    res.status(400);
    throw new Error("exchange not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (exchange.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  if (req.user.currency.toString() === req.body.currency) {
    res.status(400);
    throw new Error("Cannot specify an exchange for your default currency");
  }

  const updatedExchange = await Exchange.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("currency");

  res.status(200).json(updatedExchange);
});

const deleteExchange = asyncHandler(async (req, res) => {
  const exchange = await Exchange.findById(req.params.id);

  if (!exchange) {
    res.status(400);
    throw new Error("exchange not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (exchange.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const investment = await await Investment.find({ currency: exchange.currency });

  if (investment.length > 0) {
    res.status(400);
    throw new Error("You have investments asociated to this exchange");
  }

  await exchange.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExchanges,
  createExchange,
  updateExchange,
  deleteExchange,
};
