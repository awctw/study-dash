const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
    uppercase: true,
    required: true,
  },
  // references the user object that this TODOItem belongs to
  userID: {
    type: String,
    required: true,
    trim: true,
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;