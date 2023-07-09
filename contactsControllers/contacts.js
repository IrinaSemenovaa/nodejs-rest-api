const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const asyncHandler = require("../helpers/asyncHandler");

const getAll = asyncHandler(async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

const getById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});

const addContact = asyncHandler(async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
});

const deleteById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
});

const updateById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});

module.exports = {
  getAll,
  getById,
  addContact,
  deleteById,
  updateById,
};
