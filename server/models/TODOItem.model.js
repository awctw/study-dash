const mongoose = require('mongoose');
require('mongoose-type-url');
const Joi = require('joi');

// new attribute to TODOItem is category
const TODOItemSchema = new mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  // determines whether current TODOItem is finished or not
  isFinished: {
    type: Boolean,
    required: true,
  },
  // references a Category document
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
    required: true
  },
  // references the user object that this TODOItem belongs to
  userID: {
    type: String,
    required: true,
    trim: true,
  }
});

const TODOItem = mongoose.model('TODOItem', TODOItemSchema);

// checks whether TODOItem input has all of its attributes properly
// instantiated
function validateTODOItem(item) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    description: Joi.string().trim().required(),
    isFinished: Joi.boolean().required(),
    category: Joi.string().trim().uppercase().required(),
    userID: Joi.string().trim().required(),
  });

  return schema.validate(item);
}

module.exports = {
  TODOItem,
  validate: validateTODOItem,
};