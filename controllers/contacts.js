const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError");
const asyncHandler = require("../helpers/asyncHandler");

const getAll = asyncHandler(async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
});

const getById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});

const addContact = asyncHandler(async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});

const deleteById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
});

const updateById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});

const updateStatusContact = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return next(new HttpError(400, "missing field favorite"));
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return next(new HttpError(404, "Contact not found"));
    }

    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    next(new HttpError(500, "Internal server error"));
  }
});

module.exports = {
  getAll,
  getById,
  addContact,
  deleteById,
  updateById,
  updateStatusContact,
};
