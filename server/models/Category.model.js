const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
    required: true,
  },
  // references the user object that this Category belongs to
  userID: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    default: '#000000'
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;